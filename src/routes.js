import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import TeacherController from './app/controllers/TeacherController';
import PostController from './app/controllers/PostController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/teachers', TeacherController.index);

routes.post('/posts', PostController.store);

export default routes;
