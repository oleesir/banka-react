import React ,{ useReducer, useContext, useEffect } from 'react';
import AccountContext from '../account/accountContext';
import accountReducer from '../account/accountReducer';
import AuthContext from '../auth/authContext';
import axios from 'axios';
import {
CREATE_ACCOUNT,
IS_LOADING,
CREATE_ACCOUNT_ERROR,
LOAD_USER_ACCOUNTS,
CLEAR_ERRORS
} from '../types'

const AccountState = props => {
    const authContext = useContext(AuthContext);

    console.log(authContext);
    const { user, isAuthenticated, updateUser } = authContext;

    const initialState = {
      isLoading: false,
      isAuthenticating: true,
      accounts: [],
      error: null,
    };

    useEffect(() => {
      if (isAuthenticated) {
        dispatch({
          type: LOAD_USER_ACCOUNTS,
          payload: user.accounts || []
        })
      }
    // eslint-disable-next-line
    }, [isAuthenticated])
    

    const [state, dispatch] = useReducer(accountReducer, initialState);

    //create account
    const createAccount = async formData => {
      const config= {
        headers:{
            'Content-Type':'application/json'
        }
      }

      try {
        dispatch({
          type: IS_LOADING,
        });
  
        const res = await axios.post('http://localhost:5000/api/v1/accounts', formData, config);
  
        updateUser({ accounts: [...state.accounts, res.data.data] });
  
        dispatch({
          type: CREATE_ACCOUNT,
          payload: res.data.data
        });

        return res.data.data;
      } catch (err) {
        console.log(err, err.response)
        dispatch({
          type: CREATE_ACCOUNT_ERROR,
          payload: err.response ? err.response.data.error : err.message
        });
      }
    }

  //clear errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
    })
  }

  return (
      <AccountContext.Provider
        value={{
          isLoading: state.isLoading,
          accounts: state.accounts,
          error: state.error,
          createAccount,
          clearErrors
        }}
      >
        {props.children}
      </AccountContext.Provider>
  )
}

export default AccountState;


