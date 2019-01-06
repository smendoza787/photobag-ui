import { SET_CURRENT_ALBUM, SET_CURRENT_ALBUM_PHOTOS, ADD_PHOTO_TO_CURRENT_ALBUM, REMOVE_PHOTO_FROM_CURRENT_ALBUM } from '../constants/albumConstants';

const initialState = {};

export default (state = initialState, action)  => {
  switch (action.type) {
    case SET_CURRENT_ALBUM:
      return action.payload;
    case SET_CURRENT_ALBUM_PHOTOS:
      return {
        ...state,
        photoKeys: action.payload
      };
    case ADD_PHOTO_TO_CURRENT_ALBUM:
      return {
        ...state,
        photoKeys: [...state.photoKeys, action.payload]
      };
    case REMOVE_PHOTO_FROM_CURRENT_ALBUM: {
      const newPhotos = state.photoKeys.filter(x => x !== action.payload);

      return {
        ...state,
        photoKeys: newPhotos
      };
    }
    default:
      return state;
  }
};