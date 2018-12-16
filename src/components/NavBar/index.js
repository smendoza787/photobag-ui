import React from 'react';
import Header from '../Header';
import { Link } from "react-router-dom";

import './NavBar.css';

class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <Header title={'Austin Mendoza'} />
        <Link to="/album/my-observations"><h4>My Observations</h4></Link>
        <Link to="/album/pretty-women"><h4>Pretty Women</h4></Link>
        <Link to="/album/strangers"><h4>Strangers</h4></Link>
      </div>
    );
  }
}

export default NavBar;