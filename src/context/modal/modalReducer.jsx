import {
 SET_MODAL,
 REMOVE_MODAL
} from '../types';

export default (state, action) => {
const { type } = action;

switch(type) {
  case SET_MODAL:
    return {
      ...state,
      showModal: true,
      modal: action.payload
    };
  case REMOVE_MODAL:
    return {
        ...state,
        showModal: false,
        modal: null
    }
  default:
    return state;
}
}