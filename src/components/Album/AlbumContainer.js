import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

import Album from './Album';
import { toggleCreateNewAlbumModal as _toggleCreateNewAlbumModal } from '../../store/actions/modalActions';
import { albumsSelector, currentAlbumSelector } from '../../store/selectors/albumSelectors';
import s3bucket, { BUCKET_NAME } from '../../aws/s3bucket';
import Image from './Image';

class AlbumContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      photoKeys: [],
      loadingAlbum: false
    }

    this.addImageToPhotos = this.addImageToPhotos.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currAlbum !== this.props.currAlbum) {
      this.fetchPhotos();
    }
  }

  fetchPhotos() {
    this.setState({ photoKeys: [], loadingAlbum: true });
    const albumId = this.props.currAlbum.albumId;

    const params = {
      Bucket: BUCKET_NAME,
      Prefix: `${albumId}/`
    };

    s3bucket.listObjectsV2(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        const photoKeys = data.Contents.map(content => content.Key);
        this.setState({ photoKeys, loadingAlbum: false });
      }
    })
  }

  deletePhoto(keyToDelete) {
    const params = {
      Bucket: BUCKET_NAME,
      Key: keyToDelete
    };    

    s3bucket.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        const { currAlbum } = this.props;
        const newPhotos = this.state.photoKeys.filter(key => key !== keyToDelete);

        const data = {
          albumId: currAlbum.albumId,
          albumName: currAlbum.albumName,
          photoKeys: newPhotos
        };

        fetch(`https://tfmybvjjik.execute-api.us-west-2.amazonaws.com/latest/albums/${currAlbum.albumId}`, {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then(data => {
            this.setState({ photoKeys: newPhotos });
          });
      }
    });
  }

  renderPhotos(bucketKeys) {

    if (this.state.loadingAlbum) {
      return <Spinner name='double-bounce' />;
    }

    return bucketKeys.map((key, i) => {
      const url = s3bucket.getSignedUrl('getObject', {
        Bucket: BUCKET_NAME,
        Key: key,
        Expires: 60 * 5
      });

      return <Image url={ url } handleDeletePhoto={ () => this.deletePhoto(key) } key={ i } />;
    });
  }

  addImageToPhotos(s3Key) {
    this.setState({ photoKeys: [...this.state.photoKeys, s3Key] });
  }

  render() {    
    return (
      <>
        <Album photos={ this.renderPhotos(this.state.photoKeys) } addImageToPhotos={ this.addImageToPhotos } { ...this.props } />
      </>
    );
  }
}

const mapStateToProps = (state, props) => ({
  albums: albumsSelector(state),
  currAlbum: currentAlbumSelector(props.match.params.albumId)(state)
});

const mapDispatchToProps = dispatch => ({
  toggleCreateNewAlbumModal: () => dispatch(_toggleCreateNewAlbumModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumContainer);