import React from 'react';
import { Button } from '../common';

import './Modal.css';

export const style = {
  overlay: {
    backgroundColor: 'rgba(33, 33, 33, 0.75)'
  },
  content: {
    borderRadius: '15px',
    top: '25%',
    left: '25%',
    width: '50%',
    height: '50%',
    boxShadow: '0 2px 5px #696969'
  }
};

class CreateNewAlbumModal extends React.Component {

  createBtnStyle = {
    backgroundColor: '#0bbc3a',
    color: 'white',
    width: '200px'
  };

  cancelBtnStyle = {
    width: '200px'
  };

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

  handleCancelClick() {

  }

  render() {
    const { handleCloseModal } = this.props;

    return (
      <div className="create-new-album-modal">
        <h1>Create New Album</h1>
        <div className="create-new-album-content">
          <div className="name-input">
            <p>Name: </p>
            <input type="text" value={ this.state.newAlbumValue } onChange={ this.handleOnChange } />
          </div>
          <div className="modal-btns">
            <Button text="Create" styleOverride={ this.createBtnStyle } />
            <Button text="Cancel" styleOverride={ this.cancelBtnStyle } handleClick={ handleCloseModal } />
          </div>
        </div>
      </div>
    );
  }
}

export default CreateNewAlbumModal;