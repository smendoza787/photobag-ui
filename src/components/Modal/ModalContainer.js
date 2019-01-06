import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import { createNewAlbumModalSelector, uploadPhotoModalSelector } from '../../store/selectors/modalSelectors';
import {
  toggleCreateNewAlbumModal as _toggleCreateNewAlbumModal,
  toggleUploadPhotoModal as _toggleUploadPhotoModal
} from '../../store/actions/modalActions';
import { addNewAlbum as _addNewAlbum } from '../../store/actions/albumActions';
import CreateNewAlbumModal from './CreateNewAlbumModal';
import UploadPhotoModal from './UploadPhotoModal';
import { albumsSelector } from '../../store/selectors/albumSelectors';

ReactModal.setAppElement('#root');

class ModalContainer extends React.Component {

  modalStyle = {
    overlay: {
      backgroundColor: 'rgba(33, 33, 33, 0.75)'
    },
    content: {
      borderRadius: '15px',
      top: '25%',
      left: '35%',
      width: '450px',
      height: '450px',
      boxShadow: '0 2px 5px #4c4c4c'
    }
  }

  getCurrAlbum() {
    const { albums } = this.props;
    const windowPath = window.location.pathname;
    const lastSlashIndex = windowPath.lastIndexOf('/') + 1;
    const albumId = windowPath.substring(lastSlashIndex);

    return albums.find(a => a.albumId === albumId);
  }

  render() {
    const {
      createNewAlbumModal,
      toggleCreateNewAlbumModal,
      uploadPhotoModal,
      toggleUploadPhotoModal,
      addNewAlbum,
      history
    } = this.props;    

    return (
      <>
        <ReactModal
          isOpen={ createNewAlbumModal.isOpen }
          onRequestClose={ toggleCreateNewAlbumModal }
          style={ this.modalStyle }
        >
          <CreateNewAlbumModal
          handleCloseModal={ toggleCreateNewAlbumModal }
          addNewAlbum={ addNewAlbum }
          history={ history } />
        </ReactModal>
        <ReactModal
          isOpen={ uploadPhotoModal.isOpen }
          onRequestClose={ toggleUploadPhotoModal }
          style={ this.modalStyle }>
          <UploadPhotoModal
            currAlbum={ this.getCurrAlbum() }
            handleCloseModal={ toggleUploadPhotoModal } />
        </ReactModal>
      </>
    );
  }
}

const mapStateToProps = state => ({
  createNewAlbumModal: createNewAlbumModalSelector(state),
  uploadPhotoModal: uploadPhotoModalSelector(state),
  albums: albumsSelector(state)
});

const mapDispatchToProps = dispatch => ({
  toggleCreateNewAlbumModal: () => dispatch(_toggleCreateNewAlbumModal()),
  addNewAlbum: (album) => dispatch(_addNewAlbum(album)),
  toggleUploadPhotoModal: () => dispatch(_toggleUploadPhotoModal())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalContainer));