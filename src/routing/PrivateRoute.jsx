import React from 'react';
import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Spinner from '../components/layouts/loader/Spinner';
import AuthContext from '../context/auth/authContext';


const PrivateRoute = ({component: Component, ...rest}) => {
  const authContext = useContext(AuthContext);
  const{ isAuthenticated, isAuthenticating } = authContext;

  if (isAuthenticating) {
    // create loading component
    return <Spinner/>
  }

  return (
    <Route { ...rest } render={ props => !isAuthenticated ? (<Redirect to='/login'/>) : (<Component {...props}/>)}/>
  )
}

export default PrivateRoute;