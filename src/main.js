'use strict';

import React from 'react';
import {render} from 'react-dom';

import { Router, Route, IndexRoute } from 'react-router'

import App from './components/App.jsx';
import EntryView from './views/EditView.jsx';
import SummaryView from './views/SummaryView.jsx';

require('../semantic/dist/semantic.css');
require('imports?jQuery=jquery!../semantic/dist/semantic.js');

render((
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={EntryView}/>
            <Route path="summary" component={SummaryView}/>
        </Route>
    </Router>
), document.getElementById('container'));