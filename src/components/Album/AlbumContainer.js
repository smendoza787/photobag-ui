import React from 'react';
import { connect } from 'react-redux';
import Album from './Album';

class AlbumContainer extends React.Component {
  render() {
    return <Album { ...this.props } />;
  }
}

const mapStateToProps = state => ({
  album: state.photobook.selectedAlbum
});

export default connect(mapStateToProps)(AlbumContainer);