'use strict';

import React from 'react';

import {Input} from 'react-semantify';

class EntryRow extends React.Component {
    _onChange() {
        console.log('change');
    }

    render() {
        return (
            <tr>
                <td>
                    <Input><input type="time"/></Input>
                </td>
                <td>
                    <Input className="fluid"><input type="text" placeholder="Comment"
                                                    onChange={this._onChange}/></Input>
                </td>
                <td>00:00</td>
                <td>
                    <button className="ui compact negative icon button">
                        <i className="minus icon"/>
                    </button>
                    <button className="ui compact positive icon button">
                        <i className="plus icon"/>
                    </button>
                </td>
            </tr>
        );
    }
}

export default EntryRow;