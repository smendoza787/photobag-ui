import React from 'react';
import get from 'lodash.get';
import { Button } from '../common';

import './Album.css';

const Album = ({ currAlbum, addImageToPhotos, toggleUploadPhotoModal, photos }) => (
  <div className="album">
    <div className="album-header">
      <h1>{ get(currAlbum, 'albumName') }</h1>
      <Button text="Upload Photos" classOverride="btn-album-header" handleClick={ toggleUploadPhotoModal } />
    </div>
    <div className="album-photos">
      { photos }
    </div>
  </div>
);

export default Album;