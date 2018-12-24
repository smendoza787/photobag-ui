import { SET_ALBUMS, ADD_NEW_ALBUM } from "../constants/albumConstants";

const initialState = {
  albums: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALBUMS:
      return {
        ...state,
        albums: action.payload
      };
    case ADD_NEW_ALBUM:
      return {
        ...state,
        albums: [...state.albums, action.payload]
      };
    default:
      return state;
  }
};