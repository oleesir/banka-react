import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    USER_LOADED,
    AUTH_ERROR,
    AUTHENTICATING,
    UPDATE_USER
} from '../types';

export default (state, action) => {
  const { type } = action;

  switch(type) {
    case AUTHENTICATING:
      return {
        ...state,
        isAuthenticating: true,
      };
    case USER_LOADED:
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isAuthenticating: false,
      };
    case SIGNUP_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      return {
          ...state,
          user: null,
          isAuthenticated: false,
          isAuthenticating: false,
          error: action.payload
      }
    case CLEAR_ERRORS:
      return  {
        ...state,
        error: null
      }
    case UPDATE_USER:
      return  {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      }
    default:
      return state;
  }
}