import React from 'react';

class Album extends React.Component {
  render() {
    const { match } = this.props;
    const albumId = match.params.albumId;

    return (
      <div>
        <h1>Album: { albumId }</h1>
      </div>
    );
  }
}

export default Album;