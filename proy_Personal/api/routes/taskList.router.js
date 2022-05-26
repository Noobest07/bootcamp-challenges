import express from 'express';
import uploader from '../config/multer.js';
const router = express.Router();

import { isAuthenticated } from '../middlewares/index.js';
import { taskListCtrl } from '../controllers/index.js';

const {
  getList,
  getLists,
  createList,
  deleteList,
  findList,
  updateList,
  uploadImage,
  deleteImage,
  getImage,
} = taskListCtrl;

const favRoutes = {
  CREATE_LIST: '/lists',
  GET_LISTS: '/lists',
  GET_LIST: '/lists/:id',
  DELETE_LIST: '/lists/:id',
  UPDATE_LIST: '/lists/:id',
  UPLOAD_IMAGE: '/lists/:id/image',
  DELETE_IMAGE: '/lists/:id/image',
  GET_IMAGE: '/lists/:id/image',
};

router.get(favRoutes.GET_LISTS, isAuthenticated, getLists);
router.get(favRoutes.GET_LIST, isAuthenticated, getList);
router.post(favRoutes.CREATE_LIST, isAuthenticated, createList);
router.delete(favRoutes.DELETE_LIST, isAuthenticated, deleteList);
router.put(favRoutes.UPDATE_LIST, isAuthenticated, findList, updateList);
router.post(
  favRoutes.UPLOAD_IMAGE,
  isAuthenticated,
  uploader.single('image'),
  findList,
  uploadImage
);
router.delete(
  favRoutes.DELETE_IMAGE,
  isAuthenticated,
  uploader.single('image'),
  findList,
  deleteImage
);
router.get(favRoutes.GET_IMAGE, getImage);

export default router;
