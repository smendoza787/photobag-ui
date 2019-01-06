import { SET_CURRENT_ALBUM, SET_CURRENT_ALBUM_PHOTOS } from '../constants/albumConstants';

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
    default:
      return state;
  }
};