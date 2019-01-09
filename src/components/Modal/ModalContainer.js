import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import { createNewAlbumModalSelector, uploadPhotoModalSelector } from '../../store/selectors/modalSelectors';
import {
  toggleCreateNewAlbumModal as _toggleCreateNewAlbumModal,
  toggleUploadPhotoModal as _toggleUploadPhotoModal
} from '../../store/actions/modalActions';
import {
  addNewAlbum as _addNewAlbum,
  addNewPhotoToAlbum as _addNewPhotoToAlbum
} from '../../store/actions/albumActions';
import CreateNewAlbumModal from './CreateNewAlbumModal';
import UploadPhotoModal from './UploadPhotoModal';
import { albumsSelector, currentAlbumSelector } from '../../store/selectors/albumSelectors';

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

  render() {
    const {
      currAlbum,
      createNewAlbumModal,
      toggleCreateNewAlbumModal,
      uploadPhotoModal,
      toggleUploadPhotoModal,
      addNewAlbum,
      addNewPhotoToAlbum,
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
            currAlbum={ currAlbum }
            handleCloseModal={ toggleUploadPhotoModal }
            addNewPhotoToAlbum={ addNewPhotoToAlbum } />
        </ReactModal>
      </>
    );
  }
}

const mapStateToProps = state => ({
  createNewAlbumModal: createNewAlbumModalSelector(state),
  uploadPhotoModal: uploadPhotoModalSelector(state),
  albums: albumsSelector(state),
  currAlbum: currentAlbumSelector(state)
});

const mapDispatchToProps = dispatch => ({
  toggleCreateNewAlbumModal: () => dispatch(_toggleCreateNewAlbumModal()),
  toggleUploadPhotoModal: () => dispatch(_toggleUploadPhotoModal()),
  addNewAlbum: (album) => dispatch(_addNewAlbum(album)),
  addNewPhotoToAlbum: (photo) => dispatch(_addNewPhotoToAlbum(photo))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalContainer));