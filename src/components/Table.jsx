'use strict';

import React from 'react';

import ClassNameEnhance from '../lib/ClassNameEnhance.jsx';

class Table extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <table className={this.props.className}>
                {this.props.children}
            </table>
        );
    }
}

export default ClassNameEnhance(Table, 'ui table');