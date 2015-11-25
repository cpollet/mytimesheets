'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

require('../semantic/dist/semantic.css');
require('imports?jQuery=jquery!../semantic/dist/semantic.js');

ReactDOM.render(<App />, document.getElementById('container'));
