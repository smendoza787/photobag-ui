import { combineReducers } from 'redux';
import albumReducer from './albumReducer';
import currentAlbumReducer from './currentAlbumReducer';
import modalReducer from './modalReducer';

export default combineReducers({
  albums: albumReducer,
  currentAlbum: currentAlbumReducer,
  modal: modalReducer
});