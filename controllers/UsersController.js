import dbClient from '../utils/db';

const sha1 = require('sha1');

class UsersController {
  static postNew(request, response) {
    const { email, password } = request.body;
    if (!email) {
      response.status(400).json({ error: 'Missing email' });
      return;
    }
    if (!password) {
      response.status(400).json({ error: 'Missing password' });
      return;
    }
    const users = dbClient.db.collection('users');
    users.findOne({ email }, async (err, user) => {
      if (user) {
        response.status(400).json({ error: 'Already exist' });
      } else {
        const hashedPass = sha1(password);
        const result = await users.insertOne({ email, password: hashedPass });
        response.status(201).json({ _id: result.insertedId, email });
      }
    });
  }
}
module.exports = UsersController;
