import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';
// 2. First API: status stats
// 3. Create a new user: users
// 4. Authenticate a user: connect disconnect user/me
// 5. First file: files
// 6. Get and list file: files/:id files
// 7. File publish/unpublish: files
// 8. File data: files/:id/data

const router = Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

router.post('/users', UsersController.postNew);

router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/users/me', UsersController.getMe);

router.post('/files', FilesController.postUpload);

router.get('/files/:id', FilesController.getShow);
router.get('/files', FilesController.getIndex);

router.put('/files/:id/publish', FilesController.putPublish);
router.put('/files/:id/unpublish', FilesController.putUnpublish);

router.get('/files/:id/data', FilesController.getFile);

module.exports = router;
