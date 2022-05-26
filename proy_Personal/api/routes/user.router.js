import express from 'express';
const router = express.Router();

import { userCtrl } from '../controllers/index.js';
import { isAuthenticated } from '../middlewares/index.js';

const { login, createUser, info } = userCtrl;

const userRoutes = {
  CREATE: '/auth/users/create',
  LOGIN: '/auth/users/login',
  INFO: '/auth/users',
};

router.get(userRoutes.INFO, isAuthenticated, info);
router.post(userRoutes.CREATE, createUser);
router.post(userRoutes.LOGIN, login);

export default router;
