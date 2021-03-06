import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { toggleCreateNewAlbumModal as _toggleCreateNewAlbumModal } from './store/actions/modalActions';
import {
  fetchAlbums as _fetchAlbums,
  removeAlbum as _removeAlbum
} from './store/actions/albumActions';
import { albumsSelector } from './store/selectors/albumSelectors';

import { NavBar } from './components/NavBar';
import Main from './components/Main';
import Home from './components/Home';
import { AlbumContainer } from './components/Album';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import ModalContainer from './components/Modal/ModalContainer';

const propTypes = {
  albums: PropTypes.array.isRequired,
  fetchAlbums: PropTypes.func.isRequired
};

class App extends Component {
  componentDidMount() {
    this.props.fetchAlbums();
  }

  render() {

    return (
      <div className="app">
        <Router>
          <>
            <NavBar { ...this.props } />
            <Main>
              <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/album/:albumId" component={AlbumContainer} />
              </Switch>
            </Main>
            <ModalContainer />
          </>
        </Router>
      </div>
    );
  }
}

App.propTypes = propTypes;

const mapStateToProps = state => ({
  albums: albumsSelector(state),
});

const mapDispatchToProps = dispatch => ({
  fetchAlbums: () => dispatch(_fetchAlbums()),
  removeAlbum: (albumId) => dispatch(_removeAlbum(albumId)),
  toggleCreateNewAlbumModal: () => dispatch(_toggleCreateNewAlbumModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
