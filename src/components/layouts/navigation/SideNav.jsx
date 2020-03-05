import React, { useContext, useEffect } from 'react';
import AuthContext from '../../../context/auth/authContext';

const SideNav = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, logout } = authContext;
     
  useEffect(()=> {
    authContext.loadUser();
    // eslint-disable-next-line
  },[]);

  if (!isAuthenticated) return null;

  const onLogout = () => {
    logout();
  }

  return (
    <div class="side-column">
    <div class="close-icon">
        <i class="fas fa-times fa-2x close" title="close"></i>
    </div>
    <div class="user">
        <p>A</p>
    </div>
    <div class="user-name">
  <p>Hello {user && user.firstName}</p>
    </div>
    <div class="side-column-links">
      <a href="./profile.html" class="active"><i class="fas fa-user"></i> &nbsp; &nbsp;Profile</a>
      <a href="./user_accounts.html" ><i class="fas fa-th-list"></i> &nbsp;&nbsp;Accounts</a>
      <a href="./transaction_history.html"><i class="fas fa-history"></i> &nbsp;&nbsp;Transactions</a>
      <a href="./index.html" onClick={onLogout}><i class="fas fa-sign-out-alt"></i> &nbsp;&nbsp;Logout</a>
     </div>
  </div>
      
  
  )
}

export default SideNav;
