import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import taskList from './taskList';

export default combineReducers({
  alert,
  auth,
  taskList,
});
