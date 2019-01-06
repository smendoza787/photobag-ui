import {
  SET_ALBUMS,
  ADD_NEW_ALBUM,
  SET_CURRENT_ALBUM,
  SET_CURRENT_ALBUM_PHOTOS
} from '../constants/albumConstants';

// ==========================
// Albums
// ==========================

const setAlbums = albums => ({
  type: SET_ALBUMS,
  payload: albums
});

export const fetchAlbums = () => dispatch => {
  fetch('https://tfmybvjjik.execute-api.us-west-2.amazonaws.com/latest/albums')
      .then(res => res.json())
      .then(data => dispatch(setAlbums(data)));
};

export const addNewAlbum = album => ({
  type: ADD_NEW_ALBUM,
  payload: album
});

// ==========================
// Current Album
// ==========================

export const setCurrAlbum = album => ({
  type: SET_CURRENT_ALBUM,
  payload: album
});

export const setCurrAlbumPhotos = photos => ({
  type: SET_CURRENT_ALBUM_PHOTOS,
  payload: photos
});