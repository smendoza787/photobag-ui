import { SET_ALBUMS } from "../constants/albumConstants";

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
    default:
      return state;
  }
};