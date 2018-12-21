import { SET_ALBUMS, SELECT_ALBUM } from '../constants/albumConstants';

export const setAlbums = albums => dispatch => {
  dispatch({
    type: SET_ALBUMS,
    payload: albums
  });
};

export const selectAlbum = album => dispatch => {
  dispatch({
    type: SELECT_ALBUM,
    payload: album
  });
};