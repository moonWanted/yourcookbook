import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import Popper from 'popper.js';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'popper.js/dist/popper'
import 'bootstrap/js/dist/util'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App className='container' />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
