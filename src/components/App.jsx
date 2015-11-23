'use strict';

import React from 'react';
import MaterialUI from 'material-ui';
import Theme from '../theme.js';

var ThemeManager = MaterialUI.Styles.ThemeManager;
var AppBar = MaterialUI.AppBar;

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            message: 'Hello from reactJS'
        };
    }

    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(Theme)
        }
    }

    render() {
        return (
            <div>
                <AppBar title="My Timesheets"/>
                <b>{this.state.message}</b>
            </div>
        );
    }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default App;
