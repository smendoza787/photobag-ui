import { SET_ALBUMS } from '../constants/albumConstants';

const setAlbums = albums => ({
  type: SET_ALBUMS,
  payload: albums
});

export const fetchAlbums = () => dispatch => {
  fetch('https://tfmybvjjik.execute-api.us-west-2.amazonaws.com/latest/albums')
      .then(res => res.json())
      .then(data => dispatch(setAlbums(data)));
};