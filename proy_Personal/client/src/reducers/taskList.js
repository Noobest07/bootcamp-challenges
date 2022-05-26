import { GET_LISTS, CLEAN_LIST } from '../actions/types';

const initialState = {
  taskLists: [],
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LISTS:
      return {
        ...state,
        taskLists: payload,
      };
    case CLEAN_LIST:
      return {
        ...state,
        taskLists: [],
      };
    default:
      return state;
  }
}

export default authReducer;
