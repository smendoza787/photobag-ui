import React from 'react';
import { withRouter } from 'react-router-dom';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.navigateHome = this.navigateHome.bind(this);
  }
  
  navigateHome() {
    this.props.history.push('/');
  }
  
  render() {
    return (
      <h1 className="nav-header" onClick={this.navigateHome}>{ this.props.title }</h1>
    );
  }
}

export default withRouter(Header);