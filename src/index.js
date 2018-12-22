import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import './index.css';
import App from './App';

import whyDidYouUpdate from 'why-did-you-update';
whyDidYouUpdate(React);

// dot-env config
require('dotenv').config()

ReactDOM.render(
  <Provider store={ configureStore() }>
    <App />
  </Provider>,
  document.getElementById('root')
);
