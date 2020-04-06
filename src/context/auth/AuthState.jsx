import React ,{ useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../auth/authContext';
import authReducer from '../auth/authReducer';
import setAuthToken from '../../utils/setAuthToken';
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
UPDATE_USER,
} from '../types'

const AuthState = props => {
    const initialState = {
      isAuthenticated: false,
      isAuthenticating: true,
      user: null,
      error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);
    const history = useHistory();

    console.log(state)

    // Load User
    const loadUser = async()=>{
      dispatch({
        type: AUTHENTICATING,
      });

      if (localStorage.token){
        setAuthToken(localStorage.token);
      }

      try{
        const res = await axios.get('http://localhost:5000/api/v1/auth');
        dispatch({
          type: USER_LOADED,
          payload: res.data.data
        })
      } catch(err) {
        dispatch({
          type: AUTH_ERROR
        })
        history.push("/login");
      }
    }

    //register user
    const signUp = async formData => {
      const config= {
        headers:{
            'Content-Type':'application/json'
        }
      }

      dispatch({
        type: AUTHENTICATING,
      });

      try{
        const res = await axios.post('http://localhost:5000/api/v1/auth/signup', formData, config);

        localStorage.setItem('token', res.data.data.token);

        dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data.data
        });
      } catch(err) {
        dispatch({
          type: SIGNUP_FAIL,
          payload: err.response.data.error
        })
      }
    }

    //login 
    const login = async formData => {
      const config = {
        headers:{
          'Content-Type':'application/json'
        }
      }

      dispatch({
        type: AUTHENTICATING,
      });

      try{
        const res = await axios.post('http://localhost:5000/api/v1/auth/signin', formData, config);

        localStorage.setItem('token', res.data.data.token);

        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data.data
        });
      } catch(err){
        dispatch({
          type: LOGIN_FAIL,
          payload: err.response.data.error
        })
        console.log('hello world',err.response.data.error)
      }
    }

    // logout
    const logout = () => {
      localStorage.removeItem('token');

      dispatch({
        type:LOGOUT
      })
    }

  //clear errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
    })
  }

  const updateUser = (updatedUser) => {
    dispatch({
      type: UPDATE_USER,
      payload: updatedUser
    })
  }

  return (
      <AuthContext.Provider
        value={{
          isAuthenticated: state.isAuthenticated,
          isAuthenticating: state.isAuthenticating,
          user: state.user,
          error: state.error,
          signUp,
          login,
          logout,
          clearErrors,
          loadUser,
          updateUser
        }}
      >
        {props.children}
      </AuthContext.Provider>
  )
}

export default AuthState;


