import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { toggleCreateNewAlbumModal as _toggleCreateNewAlbumModal } from './store/actions/modalActions';
import { setAlbums as _setAlbums } from './store/actions/albumActions';
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
  setAlbums: PropTypes.func.isRequired
};

class App extends Component {
  componentDidMount() {
    const { setAlbums } = this.props;

    fetch('https://tfmybvjjik.execute-api.us-west-2.amazonaws.com/latest/albums')
      .then(res => res.json())
      .then(data => setAlbums(data));
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
          </>
        </Router>
        <ModalContainer />
      </div>
    );
  }
}

App.propTypes = propTypes;

const mapStateToProps = state => ({
  albums: albumsSelector(state),
});

const mapDispatchToProps = dispatch => ({
  setAlbums: (albums) => dispatch(_setAlbums(albums)),
  toggleCreateNewAlbumModal: () => dispatch(_toggleCreateNewAlbumModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
