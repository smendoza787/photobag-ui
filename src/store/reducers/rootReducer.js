import { combineReducers } from 'redux';
import albumReducer from './albumReducer';
import modalReducer from './modalReducer';

export default combineReducers({
  photobook: albumReducer,
  modal: modalReducer
});