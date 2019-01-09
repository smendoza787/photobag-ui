import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import { pure } from 'recompose';

import './NavBar.css';
import Button from '../common/Button';
import NavBarLink from './NavBarLink';

const NavBar = ({ albums, toggleCreateNewAlbumModal }) => {
  return (
    <div className="navbar">
      <Header title={'Austin Mendoza'} />
      {albums.map((el, i) => {
        return <Link to={`/album/${el.albumId}`} key={i}><NavBarLink text={ el.albumName } /></Link>
      })}
      <Button text="Create New Album" classOverride="btn-navbar" handleClick={ toggleCreateNewAlbumModal } />
    </div>
  );
}

export default pure(NavBar);