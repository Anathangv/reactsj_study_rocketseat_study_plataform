import express from 'express'
import ClassController from './controllers/classesController';
import ConnectionController from './controllers/connectionController';

export const routes = express.Router();
const classControllers = new ClassController();
const connectionController = new ConnectionController();

routes.get('/classes', classControllers.index);
routes.post('/classes', classControllers.create);

routes.post('/connections', connectionController.create);
routes.get('/connections', connectionController.index);