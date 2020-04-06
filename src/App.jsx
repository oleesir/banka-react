import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from'./pages/auth/Signup';
import Login from './pages/auth/Login';
import Profile from './pages/profile/Profile';
import Account from './pages/accounts/Account';
import AccountView from './pages/accounts/AccountView';
import AuthState from './context/auth/AuthState';
import ModalState from './context/modal/ModalState';
import AlertState from './context/alert/AlertState';
import AccountState from './context/account/AccountState';
import setAuthToken from './utils/setAuthToken';
import SideNav from './components/layouts/navigation/SideNav';
import PrivateRoute from './routing/PrivateRoute';

import './App.css';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Router>
    <AuthState>
      <AccountState>
      <ModalState>
      <AlertState>
      <div className="App">
        <SideNav/>
        <Switch>
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/login' component={Login}/>
          <PrivateRoute exact path='/' component={Profile}/>
          <PrivateRoute exact path='/accounts' component={Account}/>
          <PrivateRoute exact path='/accounts/:id' component={AccountView}/>
        </Switch>
        </div>
      </AlertState> 
      </ModalState>
      </AccountState>
    </AuthState>
    </Router>
  );
}

export default App;

