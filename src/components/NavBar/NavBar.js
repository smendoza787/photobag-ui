import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import { pure } from 'recompose';

import './NavBar.css';

const NavBar = ({ albums }) => {
  return (
    <div className="navbar">
      <Header title={'Austin Mendoza'} />
      {albums.map((el, i) => {
        return <Link to={`/album/${el.albumId}`} key={i}><h4>{el.albumName}</h4></Link>
      })}
    </div>
  );
}

export default pure(NavBar);