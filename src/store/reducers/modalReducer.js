import { TOGGLE_MODAL } from '../constants/modalConstants';

const initialState = {
  isOpen: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        isOpen: !state.isOpen
      };
    default:
      return state;
  }
};