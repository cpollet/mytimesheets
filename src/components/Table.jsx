'use strict';

import React from 'react';
import {Button} from 'react-semantify';
import ClassNameEnhance from '../lib/ClassNameEnhance.jsx';

class Table extends React.Component {
    render() {
        return (
            <div>
                <table className={this.props.className}>
                    {this.props.children}
                </table>
            </div>
        );
    }
}

export default ClassNameEnhance(Table, 'ui table');