import React from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Signup from'./pages/auth/Signup';
import Login from './pages/auth/Login';
import Profile from './pages/profile/Profile';
import AuthState from '../../client/src/context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';


if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <AlertState>
      <Router>
      <div className="App">
        <Switch>
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/' component={Profile}/>
        </Switch>
        </div>
      </Router>
      </AlertState> 
    </AuthState>
    
  );
}

export default App;

