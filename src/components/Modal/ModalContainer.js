import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { createNewAlbumModalSelector } from '../../store/selectors/modalSelectors';
import { toggleCreateNewAlbumModal as _toggleCreateNewAlbumModal } from '../../store/actions/modalActions';

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
        >
          <h1>Create New Album</h1>
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