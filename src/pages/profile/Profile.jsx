import React, { useContext, useState } from 'react';
import AuthContext from '../../context/auth/authContext';
import './Profile.css';

const Profile = () => {
  const authContext = useContext(AuthContext);

  const{ user } = authContext;

  const [selectedAccount, setSelectedAccount] = useState(user.accounts[0]);

  //  const {firstName, lastName, email, phoneNumber, address, city} = user;

  const handleAccountSelect = (event) => {
    
    const selectedAccountNumber = event.target.value;

    const accountToSelect = user.accounts.find((account) => selectedAccountNumber === account.accountNumber);

    setSelectedAccount(accountToSelect); 
  };


  return (
    <div className="wrapper">
      <div className="main-column">
        <div className="main-column-header">
          <div>
            <i className="fas fa-bars fa-2x menu" title="menu"></i>
          </div>
          <div className="main-column-brand">
              <p>BankOfOlive</p>
          </div>
        </div>
        <div className="main-column-content">
          <div className="main-column-name">
            <h1>Profile</h1> 
          </div>

        
          <div className="card user-details">
            <ul className="details">
              { user && (<li> <span>Firstname</span>: { user.firstName }</li>)}
              { user && (<li> <span>Lastname</span>: { user.lastName }</li>)}
              { user && (<li> <span>Email</span>: { user.email }</li>)}
              { user && (<li> <span>Phone number</span>: { user.phoneNumber }</li>)}
              { user && (<li> <span>Address</span>: { user.address }</li>)}
              { user && (<li> <span>City</span>: { user.city }</li>)}
            </ul>
          </div>
          <div>
            {user.accounts.length > 1 && (
              <select value={selectedAccount.accountNumber} onChange={handleAccountSelect}>
                <option disabled>Select an account</option>
                {user.accounts.map((account) => (
                  <option key={account.accountNumber} value={account.accountNumber}>{`${account.accountNumber} (${account.type})`}</option>
                ))}
              </select>
            )}
          </div>
          {selectedAccount && (
            <div className="account-details">
            <div className="card account-details-item acct-bal">
              <p className="account-details-item-heading">Account Balance</p>
                <p className="amt">N {selectedAccount.balance}</p>
            </div>

            <div className="card account-details-item acct-bal">
              <p  className="account-details-item-heading">Account Number</p>
              <p className="amt">{selectedAccount.accountNumber}</p>
            </div>

            <div className="card account-details-item acct-type">
              <p className="account-details-item-heading">Account Type</p>
              <p><span className="capitalize">{selectedAccount.type}</span> account</p>
            </div>
          </div>
          )}
          {!selectedAccount && (<p>You don't have an account yet. Please create an account</p>)}
        </div>
        <div className="main-column-footer">
          <p>Olive &copy;2020</p>
        </div> 
      </div>
    </div>
  )
}
export default Profile;