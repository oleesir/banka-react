import React, { useState, useContext } from 'react';
import ModalContext from '../../../context/modal/modalContext';
import AccountContext from '../../../context/account/accountContext';
import { useHistory } from "react-router-dom";
import { CREATE_ACCOUNT_MODAL } from '../../../context/modal/modalTypes';
import './modal.css';


const CreateAccountModal = () => {
  const modalContext = useContext(ModalContext);
  const accountContext = useContext(AccountContext);

  const { removeModal } = modalContext;
  const { createAccount, clearErrors, error, isLoading } = accountContext;

  const [typeOfAccount, setTypeOfAccount] = useState('current');

  let history = useHistory();

  const closeModal = () => {
    removeModal(CREATE_ACCOUNT_MODAL);
  }

  const handleChange = event => {
    const selectedAccount = event.target.value
    setTypeOfAccount(selectedAccount);
  }

  const onSubmit = async () => {
    clearErrors();
    const newAccount = await createAccount({ type: typeOfAccount });

    console.log(newAccount)

    if (!error && !isLoading && newAccount) {
      closeModal();
      history.push(`/accounts/${newAccount.id}`);
    }
  };

  return (
    <div id="create-account-modal" className="modal">
      <div className="create-account-modal-content modal-content">
        <div className="close-span">
          <i className="fas fa-times fa-2x close-sign"  onClick={closeModal} title="Close Modal"></i>
        </div>
        {isLoading && <p>Creating Account</p>}
        {error && <p>{error}</p>}
        {!isLoading && (<div className="modal-form">
          <h1>Create an account</h1>
          <br />
          <form>
            <select id="create-account-select"
              value={typeOfAccount} 
              onChange={handleChange}
            >
              <option value="" disabled> Select Account</option>
              <option value="current">Current</option>
              <option value="savings">Savings</option>
            </select>
            <div className="btn-space">
              <button type="link" onClick={onSubmit} className="btn btn-md" id="create-account-btn">Create</button>
              <button className="cancel modal-close-btn" onClick={closeModal}>Cancel</button> 
            </div>
          </form>
        </div>)}
      </div>
    </div>
  );
};

export default CreateAccountModal;