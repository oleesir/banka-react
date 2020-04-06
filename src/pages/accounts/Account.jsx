import React, { useContext } from 'react';
import TableHeaders from '../../components/layouts/table/TableHeader';
import TableData from '../../components/layouts/table/TableData';
import ModalContext from '../../context/modal/modalContext';
import AuthContext from '../../context/auth/authContext';
import { CREATE_ACCOUNT_MODAL } from '../../context/modal/modalTypes';
import './Account.css';
import camelCaseToSentence from '../../utils/camelCaseToSentence';

const Account = () => {
  const modalContext = useContext(ModalContext);
  const authContext = useContext(AuthContext);

  const { user } = authContext;
  const { accounts } = user;
  const { setModal } = modalContext;
  //const { createAccount } = accountContext;

  const dateOptions = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric',
    hour12: true,
    timeZone: 'Africa/Lagos' 
  };

  const tableKeys = ['id', 'accountNumber', 'type', 'balance', 'createdOn'];

  const data = accounts.map(({ id, accountNumber, type, balance, createdOn }) => ({
    id,
    accountNumber,
    type,
    balance: new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(balance),
    createdOn: new Intl.DateTimeFormat('default', dateOptions).format(createdOn ? new Date(createdOn) : Date.now())
  }));
  const headers = tableKeys.map((key) => ({
    key,
    value: camelCaseToSentence(key)
  }));

  const openModal = () => {
    setModal(CREATE_ACCOUNT_MODAL);
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
          <div className="main-column-name">
            <h1>Accounts</h1> 
          </div>
          <div className="top-input-btn">
          <button className="btn-md btn create-btn modal-trigger" onClick={openModal}>Create account</button>
          </div>
         
          <table>
            <TableHeaders headers={headers} />
            <TableData keys={tableKeys} data={data} />
          </table>
        </div>
        <div className="main-column-footer">
          <p>Olive &copy;2019</p>
        </div> 
      </div>
    </div>
  )
}

export default Account;
