import React from 'react';
import { pure } from 'recompose';
import ImageUpload from '../ImageUpload/ImageUpload';

const Album = ({ album }) => (
  <div className="album">
    <h1>Album: { album && album.albumName }</h1>
    <ImageUpload />
  </div>
);

export default pure(Album);