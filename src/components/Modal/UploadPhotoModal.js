import React from 'react';
import { ImageUpload } from '../ImageUpload';

import './Modal.css';

const UploadPhotoModal = ({ currAlbum, handleCloseModal, addNewPhotoToAlbum }) => {  
  return (
    <>
      <h1>Upload Photo</h1>
      <ImageUpload
        currAlbum={ currAlbum }
        handleCloseModal={ handleCloseModal }
        addNewPhotoToAlbum={ addNewPhotoToAlbum } />
    </>
  )
};

export default UploadPhotoModal;