'use strict';

import React from 'react';

import {Button} from 'react-semantify';

import ClassNameEnhance from '../lib/ClassNameEnhance.jsx';
import AppStore from '../stores/AppStore';
import AppActions from '../actions/AppActions';

class Table extends React.Component {
    constructor() {
        super();
    }

    _onClick() {
        console.log('clicked');
        AppActions.create();
    }

    _onChange() {
        console.log('onChange in Table');
    }

    componentDidMount() {
        AppStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        AppStore.removeChangeListener(this._onChange);
    }

    render() {
        return (
            <div>
                <table className={this.props.className}>
                    {this.props.children}
                </table>
                <Button onClick={this._onClick}>Click me</Button>
            </div>
        );
    }
}

export default ClassNameEnhance(Table, 'ui table');