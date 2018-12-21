import { SET_ALBUMS, SELECT_ALBUM } from "../constants/albumConstants";

const initialState = {
  selectedAlbum: {},
  albums: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALBUMS:
      return {
        ...state,
        albums: action.payload
      };
    case SELECT_ALBUM:
      return {
        ...state,
        selectedAlbum: action.payload
      };
    default:
      return state;
  }
}