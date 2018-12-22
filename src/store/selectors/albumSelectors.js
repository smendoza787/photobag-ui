import { createSelector } from 'reselect';

export const albumsSelector = state => state.photobook.albums;

export const currentAlbumSelector = albumId => createSelector(
  albumsSelector,
  albums => albums.find(album => album.albumId === albumId)
);