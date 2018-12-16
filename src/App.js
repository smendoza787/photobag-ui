import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import Home from './components/Home';
import Album from './components/Album';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      albums: []
    };
  }

  componentDidMount() {
    let albums;

    fetch('https://tfmybvjjik.execute-api.us-west-2.amazonaws.com/latest/albums')
      .then(res => res.json())
      .then(data => this.setState({ albums: data }));
  }

  render() {
    const { albums } = this.state;
    

    return (
      <div className="app">
        <Router>
          <>
            <NavBar albums={albums} />
            <Main>
              <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/album/:albumId" component={Album} />
              </Switch>
            </Main>
          </>
        </Router>
      </div>
    );
  }
}

export default App;
