import React from 'react';
import { connect } from 'react-redux';
import Album from './Album';

class AlbumContainer extends React.Component {

  getCurrentAlbum() {
    const { albums, match } = this.props;
    const { albumId } = match.params;
    return albums.find(album => album.albumId === albumId);
  }

  render() {
    const currentAlbum = this.getCurrentAlbum();

    console.log('render');
    

    return <Album album={currentAlbum} />;
  }
}

const mapStateToProps = state => ({
  albums: state.photobook.albums,
});

export default connect(mapStateToProps)(AlbumContainer);