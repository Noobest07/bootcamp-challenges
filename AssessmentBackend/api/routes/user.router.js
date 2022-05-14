import express from 'express';
const router = express.Router();

import { userCtrl } from '../controllers/index.js';

const { login, createUser } = userCtrl;

const userRoutes = {
  CREATE: '/users/create',
  LOGIN: '/auth/local/login',
};

router.post(userRoutes.CREATE, createUser);
router.post(userRoutes.LOGIN, login);

export default router;
