import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    USER_LOADED,
    AUTH_ERROR
} from '../types';

export default (state, action) => {
  const { type } = action;

  switch(type) {
    case USER_LOADED:
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case SIGNUP_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      return {
          ...state,
          user: null,
          isAuthenticated: false,
          error: action.payload
      }
    case CLEAR_ERRORS:
      return  {
        ...state,
        error: null
      }
    default:
      return state;
  }
}