import React from 'react';
import { connect } from 'react-redux';
import Album from './Album';

class AlbumContainer extends React.Component {
  render() {
    return <Album { ...this.props } />;
  }
}

const mapStateToProps = state => ({
  album: state.albums.filter(album => album.albumName === 'Anotha Album')[0]
});

export default connect(mapStateToProps)(AlbumContainer);