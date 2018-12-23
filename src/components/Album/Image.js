import React from 'react';

import './Image.css';

class Image extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isHovered: false
    };

    this.setHover = this.setHover.bind(this);
    this.removeHover = this.removeHover.bind(this);
  }

  setHover() {
    this.setState({ isHovered: true });
  }

  removeHover() {
    this.setState({ isHovered: false });
  }

  renderDelBtn(isHovered) {
    if (isHovered) {
      return (
        <div className="del-btn" onClick={ this.props.handleDeletePhoto }>
          X
        </div>
      );
    }
  }

  render() {    
    const { url } = this.props;

    return (
      <div onMouseEnter={ this.setHover } onMouseLeave={ this.removeHover } className="image-wrapper">
        { this.renderDelBtn(this.state.isHovered) }
        <img src={url} alt="" />
      </div>
    );
  };
}

export default Image;