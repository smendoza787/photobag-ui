import { SET_ALBUMS, ADD_NEW_ALBUM } from "../constants/albumConstants";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALBUMS:
      return action.payload;
    case ADD_NEW_ALBUM:
      return [...state, action.payload];
    default:
      return state;
  }
};