import api from '../utils/api';

import { GET_LISTS, GET_LIST } from './types';
import { setAlert } from './alert';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getLists = () => async (dispatch) => {
  try {
    const res = await api.get('/lists', config);
    dispatch({
      type: GET_LISTS,
      payload: res.data,
    });
  } catch (e) {
    dispatch(setAlert('Falló la obtención de la lista', 'error'));
  }
};

export const getList = (id) => async (dispatch) => {
  try {
    const res = await api.get('/lists/' + id, config);
    dispatch({
      type: GET_LIST,
      payload: res.data,
    });
    return res.data;
  } catch (e) {
    dispatch(setAlert('Falló la obtención de las listas', 'error'));
  }
};

export const createList =
  ({ name, items }) =>
  async (dispatch) => {
    try {
      await api.post('/lists', { name, items }, config);
      dispatch(setAlert('Lista creada correctamente', 'success'));
      return true;
    } catch (e) {
      dispatch(setAlert('Falló en la creación', 'error'));
    }
  };

export const updateList =
  (id, { name, items }) =>
  async (dispatch) => {
    try {
      await api.put('/lists/' + id, { name, items }, config);
      dispatch(setAlert('Lista actualizada correctamente', 'success'));
      return true;
    } catch (e) {
      dispatch(setAlert('Falló en la actualización', 'error'));
    }
  };

export const deleteList = (id) => async (dispatch) => {
  try {
    await api.delete('/lists/' + id, config);
    dispatch(setAlert('Lista eliminada correctamente', 'success'));
    dispatch(getLists());
  } catch (e) {
    dispatch(setAlert('Falló en la eliminación', 'error'));
  }
};

export const uploadImage = (id, formData) => async (dispatch) => {
  try {
    await api.post('/lists/' + id + '/image', formData, config);
    dispatch(setAlert('La imagen ha sido subida', 'success'));
    return true;
  } catch (e) {
    dispatch(setAlert('Falló la subida de la imagen', 'error'));
  }
};

export const deleteImage = (id) => async (dispatch) => {
  try {
    await api.delete('/lists/' + id + '/image', config);
    dispatch(setAlert('La imagen ha sido eliminada', 'success'));
    return true;
  } catch (e) {
    dispatch(setAlert('Falló en la eliminación de la imagen', 'error'));
  }
};
