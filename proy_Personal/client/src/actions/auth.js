import api from '../utils/api';
import {
  REGISTER_FAIL,
  VERIFIED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAN_LIST,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const verifyToken = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    await api.get('/auth/users');
    dispatch({
      type: VERIFIED,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      await api.post('/auth/users/create', { name, email, password }, config);
      dispatch(setAlert('Se registró correctamente', 'success'));
      return true;
    } catch (err) {
      const errors = await err.response.data;
      if (typeof errors !== 'string') {
        const keys = Object.keys(errors);
        for (const key of keys) {
          dispatch(setAlert(errors[key], 'error'));
        }
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const res = await api.post(
        '/auth/users/login',
        { email, password },
        config
      );
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(setAlert('Logueado correctamente', 'success'));
    } catch (err) {
      const errors = await err.response.data;
      if (typeof errors !== 'string') {
        const keys = Object.keys(errors);
        for (const key of keys) {
          dispatch(setAlert(errors[key], 'error'));
        }
      }
      dispatch(setAlert('Ocurrió un problema', 'error'));

      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAN_LIST });
  localStorage.clear();
};
