import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  match: PropTypes.object.isRequired
};

const Album = ({ match }) => (
  <div className="album">
    <h1>Album: { match.params.albumId }</h1>
  </div>
);

Album.propTypes = propTypes;

export default Album;