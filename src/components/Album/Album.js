import React from 'react';
import get from 'lodash.get';
import ImageUpload from '../ImageUpload/ImageUpload';
import { Button } from '../common';

import './Album.css';

const Album = ({ currAlbum, addImageToPhotos, photos }) => (
  <div className="album">
    <div className="album-header">
      <h1>{ get(currAlbum, 'albumName') }</h1>
      <Button text="Upload Photos" classOverride="btn-album-header" />
    </div>
    <div className="album-photos">
      { photos }
    </div>
    <ImageUpload currAlbum={ currAlbum } addImageToPhotos={ addImageToPhotos } />
  </div>
);

export default Album;