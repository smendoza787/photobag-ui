import React from 'react';
import get from 'lodash.get';
import ImageUpload from '../ImageUpload/ImageUpload';

import './Album.css';

const Album = ({ currAlbum, handleUpload, photos }) => (
  <div className="album">
    <h1>{ get(currAlbum, 'albumName') }</h1>
    <div className="album-photos">
      { photos }
    </div>
    <ImageUpload currAlbum={ currAlbum } handleUpload={ handleUpload } />
  </div>
);

export default Album;