import React, { useContext } from 'react';
import {
  useParams
} from "react-router-dom";
import AuthContext from '../../context/auth/authContext';
import AccountContext from '../../context/account/accountContext';

export const AccountView = () => {
  const authContext = useContext(AuthContext);
  const accountContext = useContext(AccountContext);
  const { user } = authContext;
  const { accounts } = accountContext;

  const { firstName, lastName, email, phoneNumber, address } = user;

  const { id } = useParams();

  const accountToShow = accounts.find(account => +account.id === +id);

  if (!accountToShow) {
    // show a 404
    return <p>This account does not exist</p>;
  }

  return (
    <div className="wrapper">
    <div className="main-column">
      <header className="main-column-header">
        <div>
          <i className="fas fa-bars fa-2x menu" title="menu"></i>
        </div>
        <div className="main-column-brand">
            <h3>BankOfOlive</h3>
        </div>
      </header>
      <div className="main-column-content">
        <div className="return">
          <a href="./user_accounts.html"><i className="fas fa-arrow-left arrow"></i>&nbsp;Back</a>
        </div>
        <div className="main-column-success">
          <h1>Account succesfully created</h1> 
        </div>

      
        <div className="card user-details">
           <ul className='details'>
            { firstName && (<li> <span>Firstname</span>: { firstName }</li>) }
            { lastName && (<li> <span>Lasttname</span>: { lastName }</li>) }
            { email && (<li> <span>Email</span>: { email }</li>) }
            { phoneNumber && (<li> <span>Phone number</span>: { phoneNumber }</li>) }
            { address && (<li> <span>Address</span>: { address }</li>) }
            { <li> <span>Account type</span>: { accountToShow.type }</li> }
            { <li> <span>Account number type</span>: { accountToShow.accountNumber }</li> }
            { <li> <span>Balance</span>: {(new Intl.NumberFormat('en-NG', {style: 'currency',currency: 'NGN'}).format(accountToShow.balance)) }</li> }
          </ul>
        </div>

      </div>
       
      <div className="main-column-footer">
          <p>Olive &copy;2020</p>
      </div> 
    </div>                                                                                                     
  </div>
  )
}

export default AccountView;


