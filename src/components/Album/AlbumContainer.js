import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

import Album from './Album';
import {
  setCurrAlbum as _setCurrAlbum,
  setCurrAlbumPhotos as _setCurrAlbumPhotos
} from '../../store/actions/albumActions';
import { toggleUploadPhotoModal as _toggleUploadPhotoModal } from '../../store/actions/modalActions';
import { albumsSelector, currentAlbumSelector } from '../../store/selectors/albumSelectors';
import s3bucket, { BUCKET_NAME } from '../../aws/s3bucket';
import Image from './Image';

class AlbumContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingAlbum: false
    }

    this.addImageToPhotos = this.addImageToPhotos.bind(this);
  }

  componentWillMount() {
    this.fetchCurrentAlbum();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match !== prevProps.match) {
      this.fetchCurrentAlbum();
    }
  }

  fetchCurrentAlbum() {
    const { match, setCurrAlbum } = this.props;
    
    fetch(`https://tfmybvjjik.execute-api.us-west-2.amazonaws.com/latest/albums/${match.params.albumId}`)
      .then(res => res.json())
      .then(data => setCurrAlbum(data));
  }

  fetchPhotos(albumId) {    
    this.setState({ loadingAlbum: true });

    const params = {
      Bucket: BUCKET_NAME,
      Prefix: `${albumId}/`
    };

    s3bucket.listObjectsV2(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        const photoKeys = data.Contents.map(content => content.Key);
        this.props.setCurrAlbumPhotos(photoKeys);
        this.setState({ loadingAlbum: false });
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

    if (bucketKeys && bucketKeys.length > 0 ) {
      return bucketKeys.map((key, i) => {
        const url = s3bucket.getSignedUrl('getObject', {
          Bucket: BUCKET_NAME,
          Key: key,
          Expires: 60 * 5
        });
  
        return <Image url={ url } handleDeletePhoto={ () => this.deletePhoto(key) } key={ i } />;
      });
    }
  }

  addImageToPhotos(s3Key) {
    this.setState({ photoKeys: [...this.state.photoKeys, s3Key] });
  }

  render() {
    const { photoKeys } = this.state;
    const { currAlbum, toggleUploadPhotoModal } = this.props;    

    console.log('this.props => ', this.props.currAlbum);



    return (
      <Album
        photos={ this.renderPhotos(currAlbum.photoKeys) }
        addImageToPhotos={ this.addImageToPhotos }
        currAlbum={ currAlbum }
        toggleUploadPhotoModal={ toggleUploadPhotoModal } />
    );
  }
}

const mapStateToProps = (state, props) => ({
  albums: albumsSelector(state),
  currAlbum: currentAlbumSelector(state)
});

const mapDispatchToProps = dispatch => ({
  setCurrAlbum: (album) => dispatch(_setCurrAlbum(album)),
  setCurrAlbumPhotos: (photos) => dispatch(_setCurrAlbumPhotos(photos)),
  toggleUploadPhotoModal: () => dispatch(_toggleUploadPhotoModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumContainer);