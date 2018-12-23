import React from 'react';

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
  render() {
    return (
      <h1>Create New Album</h1>
    );
  }
}

export default CreateNewAlbumModal;