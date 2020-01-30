import Router from 'express';
import * as userController from './controller';

const routes = new Router();

routes.post('/user/register', userController.createUser)
routes.post('/user/login', userController.loginUser)
routes.post('/send', userController.sendOTPMail)
routes.post('/matchEmailId', userController.matchEmailId)

export default routes;