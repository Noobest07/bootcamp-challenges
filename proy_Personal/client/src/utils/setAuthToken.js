import api from './api';

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers['token'] = token;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers['token'];
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
