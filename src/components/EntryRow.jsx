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

    //region event handlers
    onTextChange(e) {
        this.setState(assign(this.state, {
            dirty: true,
            text: e.target.value
        }));
    }

    onTimeChange(e) {
        this.setState(assign(this.state, {
            dirty: true,
            time: e.target.value
        }));
    }

    onKeyDown(e) {
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

    onClickDelete() {
        EntriesAction.deleteEntry(this.props.id);
    }

    //endregion

    resetState() {
        this.state = {
            dirty: false,
            text: this.props.initialText,
            time: this.props.initialTime
        };
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
                    <button
                        className="ui compact negative icon button"
                        onClick={this.onClickDelete.bind(this)}
                    >
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
                            onChange={this.onTimeChange.bind(this)}
                            onKeyDown={this.onKeyDown.bind(this)}
                        />
                    </Input>
                </td>
                <td>
                    <Input className="fluid">
                        <input
                            type="text"
                            placeholder="Comment"
                            value={this.state.text}
                            onChange={this.onTextChange.bind(this)}
                            onKeyDown={this.onKeyDown.bind(this)}
                        />
                    </Input>
                </td>
                <td>{this.props.duration}</td>
                <td>
                    {buttons}
                </td>
            </tr>
        );
    }
}

export default EntryRow;