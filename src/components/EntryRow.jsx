'use strict';

import React from 'react';
import assign from 'object-assign';
import {Input} from 'react-semantify';
import EntriesAction from '../actions/EntriesActions';

class EntryRow extends React.Component {
    constructor(props) {
        super(props);
        this.resetState();
    }

    resetState() {
        this.state = {
            dirty: false,
            text: this.props.initialText,
            time: this.props.initialTime
        };
    }

    _onTextChange(e) {
        this.setState(assign(this.state, {
            dirty: true,
            text: e.target.value
        }));
    }

    _onTimeChange(e) {
        this.setState(assign(this.state, {
            dirty: true,
            time: e.target.value
        }));
    }

    _onBlur(e) {
        if (e.keyCode == 9) {
            if (this.shouldSave()) {
                if (this.isExistingEntry()) {
                    EntriesAction.updateEntry({
                        id: this.props.id,
                        text: this.state.text,
                        time: this.state.time
                    });
                } else {
                    EntriesAction.addEntry({
                        text: this.state.text,
                        time: this.state.time
                    });

                    this.resetState();

                    e.preventDefault();

                    this.refs.timeInput.focus();
                }
            }
        }
    }

    isExistingEntry() {
        return typeof this.props.id !== 'undefined';
    }

    shouldSave() {
        return this.state.dirty
            && (typeof this.state.text !== 'undefined' && this.state.text !== '')
            && (typeof this.state.time !== 'undefined' && this.state.time !== '');
    }

    render() {
        let buttons;

        if (this.isExistingEntry()) {
            buttons = (
                <div>
                    <button className="ui compact negative icon button">
                        <i className="minus icon"/>
                    </button>
                </div>
            );
        }

        return (
            <tr>
                <td>
                    <Input>
                        <input
                            ref="timeInput"
                            type="time"
                            value={this.state.time}
                            onChange={this._onTimeChange.bind(this)}
                            onKeyDown={this._onBlur.bind(this)}
                        />
                    </Input>
                </td>
                <td>
                    <Input className="fluid">
                        <input
                            type="text"
                            placeholder="Comment"
                            value={this.state.text}
                            onChange={this._onTextChange.bind(this)}
                            onKeyDown={this._onBlur.bind(this)}
                        />
                    </Input>
                </td>
                <td>00:00</td>
                <td>
                    {buttons}
                </td>
            </tr>
        );
    }
}

export default EntryRow;