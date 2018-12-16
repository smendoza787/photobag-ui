import React from 'react';
import Header from '../Header';
import { Link } from "react-router-dom";

import './NavBar.css';

const NavBar = ({ albums }) => (
  <div className="navbar">
    <Header title={'Austin Mendoza'} />
    {albums.map((el, i) => {
      return <Link to={`/album/${el.albumName.toLowerCase().replace(/\s/g, "-")}`} key={i} ><h4>{el.albumName}</h4></Link>
    })}
  </div>
);

export default NavBar;