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
CLEAR_ERRORS,
USER_LOADED,
AUTH_ERROR,

} from '../types'

const AuthState = props => {
    const initialState ={
      token: localStorage.getItem('token'),
      isAuthenticated: null,
      user: null,
      error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);
    const history = useHistory();

    //Load User
    const loadUser = async()=>{

      if(localStorage.token){
        setAuthToken(localStorage.token);
      }

      try{
        const res = await axios.get('http://localhost:5000/api/v1/auth');
        dispatch({
          type: USER_LOADED,
          payload: res.data?.findUser
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

      try{
        const res = await axios.post('http://localhost:5000/api/v1/auth/signup',formData,config);
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data.data
        });
          loadUser();
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

      try{
        const res = await axios.post('http://localhost:5000/api/v1/auth/signin', formData, config);

        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data.data
        })
        loadUser();
      }catch(err){
        dispatch({
          type: LOGIN_FAIL,
          payload: err.response.data.error
        })
        console.log(err);
      }
    }

  //clear errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
    })
  }

  return (
      <AuthContext.Provider
        value={{
          token: state.token,
          isAuthenticated: state.isAuthenticated,
          user: state.user,
          error: state.error,
          signUp,
          login,
          clearErrors,
          loadUser
        }}
      >
        {props.children}
      </AuthContext.Provider>
  )
}

export default AuthState;


