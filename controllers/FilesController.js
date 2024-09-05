import { v4 as uuidv4 } from 'uuid';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

const fs = require('fs').promises;
const path = require('path');

class FilesController {
  static async postUpload(request, response) {
    const token = request.header('X-Token');
    const { name, type } = request.body;
    const parentId = parseInt(request.body.parentId, 10) || 0;
    const isPublic = request.body.isPublic || false;
    const userId = await redisClient.get(`auth_${token}`);
    const saveDir = process.env.FOLDER_PATH || '/tmp/files_manager';
    let { data } = request.body;
    if (data) {
      data = Buffer.from(data, 'base64').toString('utf-8');
    }

    if (!userId) {
      response.status(401).json({ error: 'Unauthorized' });
      return;
    }
    if (!name) {
      response.status(400).json({ error: 'Missing name' });
      return;
    }
    const types = ['folder', 'file', 'image'];
    if (!type || !(types.includes(type))) {
      response.status(400).json({ error: 'Missing type' });
      return;
    }
    if (type !== 'folder' && !data) {
      response.status(400).json({ error: 'Missing data' });
      return;
    }
    const files = dbClient.db.collection('files');
    if (parentId) {
      const file = await files.findOne({ parentId });
      if (!file) {
        response.status(400).json({ error: 'Parent not found' });
        return;
      }
      if (file.type !== 'folder') {
        response.status(400).json({ error: 'Parent is not a folder' });
        return;
      }
    }
    if (type === 'folder') {
      files.insertOne({
        userId, name, type, isPublic, parentId,
      }).then((addedFile) => {
        response.status(201).json(
          {
            id: addedFile.insertedId,
            userId,
            name,
            type,
            isPublic,
            parentId,
          },
        );
      }).catch((err) => {
        console.log(err);
      });
    } else {
      const localPath = path.join(saveDir, uuidv4());
      console.log(localPath);
      await fs.mkdir(saveDir, { recursive: true });
      await fs.writeFile(localPath, data);
      files.insertOne({
        userId, name, type, isPublic, parentId, localPath,
      }).then((addedFile) => {
        response.status(201).json(
          {
            id: addedFile.insertedId,
            userId,
            name,
            type,
            isPublic,
            parentId,
          },
        );
      }).catch((err) => {
        console.log(err);
      });
    }
  }
}
module.exports = FilesController;
