import { TOGGLE_CREATE_NEW_ALBUM_MODAL, TOGGLE_UPLOAD_PHOTO_MODAL } from "../constants/modalConstants";

export const toggleCreateNewAlbumModal = () => ({
  type: TOGGLE_CREATE_NEW_ALBUM_MODAL
});

export const toggleUploadPhotoModal = () => ({
  type: TOGGLE_UPLOAD_PHOTO_MODAL
});