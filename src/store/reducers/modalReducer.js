import { TOGGLE_CREATE_NEW_ALBUM_MODAL, TOGGLE_UPLOAD_PHOTO_MODAL } from '../constants/modalConstants';

const initialState = {
  createNewAlbum: {
    isOpen: false
  },
  uploadPhoto: {
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
    case TOGGLE_UPLOAD_PHOTO_MODAL:
      return {
        ...state,
        uploadPhoto: {
          isOpen: !state.uploadPhoto.isOpen
        }
      };
    default:
      return state;
  }
};