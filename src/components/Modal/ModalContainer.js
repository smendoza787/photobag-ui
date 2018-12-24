import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { createNewAlbumModalSelector } from '../../store/selectors/modalSelectors';
import { toggleCreateNewAlbumModal as _toggleCreateNewAlbumModal } from '../../store/actions/modalActions';
import CreateNewAlbumModal, { style as createNewAlbumStyle } from './CreateNewAlbumModal';

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
      createNewAlbumModal,
      toggleCreateNewAlbumModal
    } = this.props;

    return (
      <>
        <ReactModal
          isOpen={ createNewAlbumModal.isOpen }
          onRequestClose={ toggleCreateNewAlbumModal }
          style={ this.modalStyle }
        >
          <CreateNewAlbumModal handleCloseModal={ toggleCreateNewAlbumModal } />
        </ReactModal>
      </>
    );
  }
}

const mapStateToProps = state => ({
  createNewAlbumModal: createNewAlbumModalSelector(state)
});

const mapDispatchToProps = dispatch => ({
  toggleCreateNewAlbumModal: () => dispatch(_toggleCreateNewAlbumModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);