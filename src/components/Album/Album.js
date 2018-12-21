import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  match: PropTypes.object.isRequired
};

const Album = ({ album }) => (
  <div className="album">
    <h1>Album: { album && album.albumName }</h1>
  </div>
);

Album.propTypes = propTypes;

export default Album;