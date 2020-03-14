import React, { useContext, useEffect } from 'react';
import AuthContext from '../../../context/auth/authContext';
import { Link } from 'react-router-dom';

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
    <div className="side-column">
    <div className="close-icon">
        <i className="fas fa-times fa-2x close" title="close"></i>
    </div>
    <div className="user">
        <p>A</p>
    </div>
    <div className="user-name">
  <p>{user && (`${user.firstName} ${user.lastName}`)}</p>
    </div>
    <div className="side-column-links">
      <Link to="/" className="active"><i className="fas fa-user"></i> &nbsp; &nbsp;Profile</Link>
      <Link to="/user_accounts" ><i className="fas fa-th-list"></i> &nbsp;&nbsp;Accounts</Link>
      <Link to="/transaction_history"><i className="fas fa-history"></i> &nbsp;&nbsp;Transactions</Link>
      <Link to="#!" onClick={onLogout}><i className="fas fa-sign-out-alt"></i> &nbsp;&nbsp;Logout</Link>
     </div>
  </div>
  )
}

export default SideNav;
