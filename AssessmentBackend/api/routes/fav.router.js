import express from 'express';
const router = express.Router();

import { isAuthenticated } from '../middlewares/index.js';
import { favCtrl } from '../controllers/index.js';

const {
  getFavs,
  getFav,
  createFav,
  deleteFav,
  updateFav,
  findFav,
  verifyFavSameName,
} = favCtrl;

const favRoutes = {
  CREATE_FAV: '/favs',
  GET_FAVS: '/favs',
  GET_FAV: '/favs/:id',
  DELETE_FAV: '/favs/:id',
  UPDATE_FAV: '/favs/:id',
};

router.get(favRoutes.GET_FAVS, isAuthenticated, getFavs);
router.get(favRoutes.GET_FAV, isAuthenticated, getFav);
router.post(
  favRoutes.CREATE_FAV,
  isAuthenticated,
  verifyFavSameName,
  createFav
);
router.delete(favRoutes.DELETE_FAV, isAuthenticated, deleteFav);
router.put(
  favRoutes.UPDATE_FAV,
  isAuthenticated,
  findFav,
  verifyFavSameName,
  updateFav
);

export default router;
