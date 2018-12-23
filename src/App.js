import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import { setAlbums as _setAlbums } from './store/actions/albumActions';
import { toggleModal as _toggleModal } from './store/actions/modalActions';
import { albumsSelector, modalSelector } from './store/selectors';

import { NavBar } from './components/NavBar';
import Main from './components/Main';
import Home from './components/Home';
import { AlbumContainer } from './components/Album';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';

ReactModal.setAppElement('#root');

const propTypes = {
  albums: PropTypes.array.isRequired,
  setAlbums: PropTypes.func.isRequired
};

class App extends Component {

  constructor(props) {
    super(props);

    this.handleModalClose = this.handleModalClose.bind(this);
  }

  componentDidMount() {
    const { setAlbums } = this.props;

    fetch('https://tfmybvjjik.execute-api.us-west-2.amazonaws.com/latest/albums')
      .then(res => res.json())
      .then(data => setAlbums(data));
  }

  afterModalOpens() {
    console.log('runs after modal is open');
  }

  handleModalClose() {    
    this.props.toggleModal();
  }

  render() {
    const { modal } = this.props;

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
        <ReactModal
          isOpen={ modal.isOpen }
          onAfterOpen={ this.afterModalOpens }
          onRequestClose={ this.handleModalClose }
        />
      </div>
    );
  }
}

App.propTypes = propTypes;

const mapStateToProps = state => ({
  albums: albumsSelector(state),
  modal: modalSelector(state)
});

const mapDispatchToProps = dispatch => ({
  setAlbums: (albums) => dispatch(_setAlbums(albums)),
  toggleModal: () => dispatch(_toggleModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
