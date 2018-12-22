import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

import Album from './Album';
import { albumsSelector, currentAlbumSelector } from '../../store/selectors';
import s3bucket, { BUCKET_NAME } from '../../aws/s3bucket';
import Image from './Image';

class AlbumContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      loadingAlbum: false
    }

    this.addImageToPhotos = this.addImageToPhotos.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currAlbum !== this.props.currAlbum) {
      this.setPhotos();
    }
  }

  setPhotos() {
    this.setState({ photos: [], loadingAlbum: true });
    const albumId = this.props.currAlbum.albumId;

    const params = {
      Bucket: BUCKET_NAME,
      Prefix: `${albumId}/`
    };

    s3bucket.listObjectsV2(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        this.setState({ photos: data.Contents, loadingAlbum: false });
      }
    })
  }

  deletePhoto(s3key) {
    const params = {
      Bucket: BUCKET_NAME,
      Key: s3key
    };    

    s3bucket.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        const newPhotos = this.state.photos.filter(photo => photo.Key !== s3key);

        this.setState({ photos: newPhotos });
      }
    });
  }

  renderPhotos(bucketContents) {
    
    if (this.state.loadingAlbum) {
      return <Spinner name='double-bounce' />;
    }

    return bucketContents.map((content, i) => {
      const url = s3bucket.getSignedUrl('getObject', {
        Bucket: BUCKET_NAME,
        Key: content.Key,
        Expires: 60 * 5
      });

      return <Image url={ url } handleDeletePhoto={ () => this.deletePhoto(content.Key) } />;
    });
  }

  addImageToPhotos(s3Response) {
    this.setState({ photos: [...this.state.photos, s3Response] });
  }

  render() {
    console.log();
    
    return (
      <>
        <Album photos={ this.renderPhotos(this.state.photos) } handleUpload={ this.addImageToPhotos } { ...this.props } />
      </>
    );
  }
}

const mapStateToProps = (state, props) => ({
  albums: albumsSelector(state),
  currAlbum: currentAlbumSelector(props.match.params.albumId)(state)
});

export default connect(mapStateToProps)(AlbumContainer);