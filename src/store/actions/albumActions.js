import { SET_ALBUMS, SET_SELECTED_ALBUM } from '../constants/albumConstants';

export const setAlbums = albums => dispatch => {
  dispatch({
    type: SET_ALBUMS,
    payload: albums
  });
};

export const setSelectedAlbum = album => dispatch => {
  dispatch({
    type: SET_SELECTED_ALBUM,
    payload: album
  });
};