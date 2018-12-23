import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { createNewAlbumModalSelector } from '../../store/selectors/modalSelectors';
import { toggleCreateNewAlbumModal as _toggleCreateNewAlbumModal } from '../../store/actions/modalActions';
import CreateNewAlbumModal, { style as createNewAlbumStyle } from './CreateNewAlbumModal';

ReactModal.setAppElement('#root');

class ModalContainer extends React.Component {
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
          style={ createNewAlbumStyle }
        >
          <CreateNewAlbumModal />
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