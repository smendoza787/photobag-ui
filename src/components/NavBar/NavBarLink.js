import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt as solidTrash } from '@fortawesome/pro-solid-svg-icons';
import { faTrashAlt as outlineTrash } from '@fortawesome/pro-regular-svg-icons';

import './NavBar.css';

class NavBarLink extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLinkHover: false,
      isDeleteHover: false
    };

    this.handleLinkMouseEnter = this.handleLinkMouseEnter.bind(this);
    this.handleLinkMouseLeave = this.handleLinkMouseLeave.bind(this);
    this.handleDeleteMouseEnter = this.handleDeleteMouseEnter.bind(this);
    this.handleDeleteMouseLeave = this.handleDeleteMouseLeave.bind(this);
  }

  handleLinkMouseEnter() {
    this.setState({ isLinkHover: true });
  }

  handleLinkMouseLeave() {
    this.setState({ isLinkHover: false });
  }

  handleDeleteMouseEnter() {
    this.setState({ isDeleteHover: true });
  }

  handleDeleteMouseLeave() {
    this.setState({ isDeleteHover: false });
  }

  renderDeleteIcon() {
    const {
      isLinkHover,
      isDeleteHover
    } = this.state;

    if (isLinkHover) {
      if (isDeleteHover) {
        return (
          <FontAwesomeIcon
          icon={ solidTrash }
          color="red"
          size="lg"
          onMouseEnter={ this.handleDeleteMouseEnter }
          onMouseLeave={ this.handleDeleteMouseLeave } />
        );
      } else {
        return (
          <FontAwesomeIcon
          icon={ outlineTrash }
          color="red"
          size="lg"
          onMouseEnter={ this.handleDeleteMouseEnter }
          onMouseLeave={ this.handleDeleteMouseLeave } />
        );
      }
    }
    return null;
  }

  render() {
    const { text } = this.props;

    return (
      <div className="nav-link"
        onMouseEnter={ this.handleLinkMouseEnter }
        onMouseLeave={ this.handleLinkMouseLeave }>
        <h4>{ text }</h4>
        { this.renderDeleteIcon() }
      </div>
    );
  }
}

export default NavBarLink;