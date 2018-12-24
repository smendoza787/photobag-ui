import React from 'react';
import { Button } from '../common';
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
  }

  handleOnChange(e) {
    this.setState({ newAlbumValue: e.target.value });
  }

  handleCreateClick() {

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
          onChange={ this.handleOnChange } />
        <div className="modal-btns">
          <FontAwesomeIcon icon={ faTimesCircle } size="4x" color="#" className="default-btn" onClick={ handleCloseModal } />
          <FontAwesomeIcon icon={ faCheckCircle } size="4x" color="#" className="primary-btn" />
          {/* <Button
            text="Cancel"
            classOverride="btn default-btn"
            handleClick={ handleCloseModal } />
          <Button
            text="Create"
            classOverride="btn primary-btn"
            styleOverride={ this.createBtnStyle } /> */}
        </div>
      </div>
    );
  }
}

export default CreateNewAlbumModal;