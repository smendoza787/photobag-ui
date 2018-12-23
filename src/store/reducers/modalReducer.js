import { TOGGLE_CREATE_NEW_ALBUM_MODAL } from '../constants/modalConstants';

const initialState = {
  createNewAlbum: {
    isOpen: false
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CREATE_NEW_ALBUM_MODAL:
      return {
        ...state,
        createNewAlbum: {
          isOpen: !state.createNewAlbum.isOpen
        }
      };
    default:
      return state;
  }
};