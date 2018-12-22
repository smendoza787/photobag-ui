import React from 'react';
import { connect } from 'react-redux';
import Album from './Album';
import { albumsSelector, currentAlbumSelector } from '../../store/selectors';

class AlbumContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      photos: []
    }
  }

  render() {
    const { currAlbum } = this.props;    

    return <Album album={currAlbum} />;
  }
}

const mapStateToProps = (state, props) => ({
  albums: albumsSelector(state),
  currAlbum: currentAlbumSelector(props.match.params.albumId)(state)
});

export default connect(mapStateToProps)(AlbumContainer);