import { TOGGLE_MODAL } from "../constants/modalConstants";

export const toggleModal = () => dispatch => {
  dispatch({
    type: TOGGLE_MODAL
  });
};