import {
  CREATE_ACCOUNT,
  IS_LOADING,
  CREATE_ACCOUNT_ERROR,
  LOAD_USER_ACCOUNTS,
  CLEAR_ERRORS
} from '../types';

export default (state, action) => {
  console.log(state, action)
const { type } = action;

  switch(type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_USER_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload,
      };
    case CREATE_ACCOUNT:
      return {
        ...state,
        accounts: [ ...state.accounts, action.payload ],
        isLoading: false,
      };
    case CREATE_ACCOUNT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return  {
        ...state,
        error: null
      };
    default:
      return state;
  }
}