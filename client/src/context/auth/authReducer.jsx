import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    CLEAR_ERRORS,
    USER_LOADED,
    AUTH_ERROR
} from '../types'

export default (state, action)=>{
  const { type } = action;

  switch(type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      }
    case SIGNUP_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
      };
    case SIGNUP_FAIL:
     case AUTH_ERROR:
      localStorage.removeItem('token');
      return{
          ...state,
          data: null,
          user: null,
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