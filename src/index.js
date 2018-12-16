import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// dot-env config
require('dotenv').config()

ReactDOM.render(<App />, document.getElementById('root'));
