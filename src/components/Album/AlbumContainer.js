import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

import Album from './Album';
import {
  setCurrAlbum as _setCurrAlbum,
  setCurrAlbumPhotos as _setCurrAlbumPhotos,
  removePhotoFromCurrAlbum as _removePhotoFromCurrAlbum
} from '../../store/actions/albumActions';
import { toggleUploadPhotoModal as _toggleUploadPhotoModal } from '../../store/actions/modalActions';
import { albumsSelector, currentAlbumSelector } from '../../store/selectors/albumSelectors';
import s3bucket, { BUCKET_NAME } from '../../aws/s3bucket';
import Image from './Image';

const SortablePhoto = SortableElement(({ value }) => <li>{ value }</li>);

const SortableAlbum = SortableContainer(({ items }) => {
  return (
    <ul>
      {items.map((value, index) => {
        bucketKeys.map((key, i) => {
          const url = s3bucket.getSignedUrl('getObject', {
            Bucket: BUCKET_NAME,
            Key: key,
            Expires: 60 * 5
          });

        return (
          <SortablePhoto
            key={ `item-${index}` }
            index={ index }
            value={ value } />
        );
      })}
    </ul>
  );
});

class AlbumContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingAlbum: false,
      photos: []
    }

    this.addImageToPhotos = this.addImageToPhotos.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  onSortEnd({ oldIdx, newIdx }) {
    this.setState({ items: arrayMove(this.state.photos, oldIdx, newIdx) });
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
      .then(data => {
        setCurrAlbum(data);
        this.setState({ photos: data.photoKeys });
      });
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

        const data = {
          albumId: currAlbum.albumId,
          albumName: currAlbum.albumName,
          photoKeys: currAlbum.photoKeys
        };

        fetch(`https://tfmybvjjik.execute-api.us-west-2.amazonaws.com/latest/albums/${currAlbum.albumId}`, {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then(data => {
            const { removePhotoFromCurrAlbum } = this.props;
            removePhotoFromCurrAlbum(keyToDelete);
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

    // return (
    //   <Album
    //     photos={ this.renderPhotos(currAlbum.photoKeys) }
    //     addImageToPhotos={ this.addImageToPhotos }
    //     currAlbum={ currAlbum }
    //     toggleUploadPhotoModal={ toggleUploadPhotoModal } />
    // );

    return (
      <SortableAlbum items={ this.state.photos } onSortEnd={ this.onSortEnd } />
    );
  }
}

const mapStateToProps = (state, props) => ({
  albums: albumsSelector(state),
  currAlbum: currentAlbumSelector(state)
});

const mapDispatchToProps = dispatch => ({
  toggleUploadPhotoModal: () => dispatch(_toggleUploadPhotoModal()),
  setCurrAlbum: (album) => dispatch(_setCurrAlbum(album)),
  setCurrAlbumPhotos: (photos) => dispatch(_setCurrAlbumPhotos(photos)),
  removePhotoFromCurrAlbum: (photo) => dispatch(_removePhotoFromCurrAlbum(photo))
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumContainer);