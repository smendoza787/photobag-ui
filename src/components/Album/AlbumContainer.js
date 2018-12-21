import React from 'react';
import { connect } from 'react-redux';
import Album from './Album';
import { selectAlbum as _selectAlbum } from '../../store/actions/albumActions';

class AlbumContainer extends React.Component {

  componentDidMount() {
    this.handleSelectAlbum();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      this.handleSelectAlbum();
    }
  }

  handleSelectAlbum() {
    const { albums, match, selectAlbum } = this.props;
    const { albumId } = match.params;
    const selectedAlbum = albums.find(album => album.albumId === albumId);

    selectAlbum(selectedAlbum);
  }

  render() {    
    return <Album { ...this.props } />;
  }
}

const mapStateToProps = state => ({
  albums: state.photobook.albums,
  album: state.photobook.selectedAlbum
});

const mapDispatchToProps = dispatch => ({
  selectAlbum: (album) => dispatch(_selectAlbum(album))
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumContainer);