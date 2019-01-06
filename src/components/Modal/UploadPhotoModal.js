import React from 'react';
import { ImageUpload } from '../ImageUpload';

import './Modal.css';

const UploadPhotoModal = ({ currAlbum, handleCloseModal }) => {  
  return (
    <>
      <h1>Upload Photo</h1>
      <ImageUpload currAlbum={ currAlbum } handleCloseModal={ handleCloseModal } />
    </>
  )
};

export default UploadPhotoModal;