import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlbums } from './store/actions/albumActions';
import { NavBar } from './components/NavBar';
import Main from './components/Main';
import Home from './components/Home';
import { AlbumContainer } from './components/Album';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';

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
    const { albums } = this.props;

    return (
      <div className="app">
        <Router>
          <>
            <NavBar albums={albums} />
            <Main>
              <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/album/:albumId" component={AlbumContainer} />
              </Switch>
            </Main>
          </>
        </Router>
      </div>
    );
  }
}

App.propTypes = propTypes;

const mapStateToProps = state => ({
  albums: state.albums
});

const mapDispatchToProps = dispatch => ({
  setAlbums: (albums) => dispatch(setAlbums(albums))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
