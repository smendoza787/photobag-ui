import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import Home from './components/Home';
import Album from './components/Album';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <>
            <NavBar />
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
