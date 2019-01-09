import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookDead } from '@fortawesome/pro-light-svg-icons';
import { faCheckCircle, faTimesCircle } from '@fortawesome/pro-regular-svg-icons';

import './Modal.css';

class CreateNewAlbumModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      newAlbumValue: ''
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleCreateAlbum = this.handleCreateAlbum.bind(this);
  }

  handleOnChange(e) {
    this.setState({ newAlbumValue: e.target.value });
  }

  handleCreateAlbum() {
    if (this.state.newAlbumValue.length > 0) {
      const data = {
        albumName: this.state.newAlbumValue,
	      photoKeys: []
      };

      fetch('https://tfmybvjjik.execute-api.us-west-2.amazonaws.com/latest/albums', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
        .then(data => {
          const {
            addNewAlbum,
            handleCloseModal,
            history
          } = this.props;

          addNewAlbum(data);
          handleCloseModal();
          history.push(data.albumId);          
        })
        .catch(error => console.error('Error:', error));
    }
  }

  render() {
    
    const { handleCloseModal } = this.props;

    return (
      <div className="create-new-album-modal">
        <FontAwesomeIcon icon={ faBookDead } size="6x" />
        <h1>Create New Album</h1>
        <input
          type="text"
          placeholder="Album Title"
          value={ this.state.newAlbumValue }
          onChange={ this.handleOnChange }
          autoFocus />
        <div className="modal-btns">
          <FontAwesomeIcon
            icon={ faTimesCircle }
            size="4x"
            className="default-btn"
            onClick={ handleCloseModal } />
          <FontAwesomeIcon
            icon={ faCheckCircle }
            size="4x"
            className="primary-btn"
            onClick={ this.handleCreateAlbum } />
        </div>
      </div>
    );
  }
}

export default CreateNewAlbumModal;