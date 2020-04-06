import React,{ useReducer } from 'react';
import ModalContext from './modalContext';
import modalReducer from './modalReducer';
import { SET_MODAL,REMOVE_MODAL } from '../types';
import { CREATE_ACCOUNT_MODAL } from './modalTypes';
import CreateAccountModal from '../../components/layouts/modals/CreateAccountModal';

const AlertState = props =>{
  const initialState = {
    showModal: false,
    modal: null,
  }

  const[state, dispatch] = useReducer(modalReducer,initialState);

  //setModal
  const setModal = (modal) => {
    dispatch({
      type: SET_MODAL,
      payload: modal
    });
  }

  //removeModal
  const removeModal = () => {
    dispatch({ type: REMOVE_MODAL });
  }

  const renderModal = (modal) => {
    switch(modal) {
      case CREATE_ACCOUNT_MODAL:
        return <CreateAccountModal/>;
      default:
        return null;
    }
  }

 return(
    <ModalContext.Provider
      value={{
        showModal: state.showModal,
        modal: state.modal,
        setModal,
        removeModal
      }}>
        {props.children}
        {renderModal(state.modal)}
    </ModalContext.Provider>
  )
}

export default AlertState;