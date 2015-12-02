'use strict';

import React from 'react';
import {Input} from 'react-semantify';
import ConfirmationModal from './ConfirmationModal.jsx';
import EntriesAction from '../actions/EntriesActions';

class EntryRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState();
    }

    //region event handlers
    onTextChange(e) {
        this.setState({
            dirty: true,
            text: e.target.value
        });
    }

    onTimeChange(e) {
        this.setState({
            dirty: true,
            time: e.target.value
        });
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

                    this.setState(this.initialState());

                    e.preventDefault();

                    this.refs.timeInput.focus();
                }
            }
        }
    }

    onClickDelete() {
        this.setState({
            willDelete: true
        });
    }

    onDeleteConfirmation(confirmed) {
        this.setState({
            willDelete: false
        });

        if (confirmed) {
            EntriesAction.deleteEntry(this.props.id);
        }
    }
    //endregion

    initialState() {
        return {
            dirty: false,
            willDelete: false,
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
                    <ConfirmationModal
                        confirmationTitle="Delete entry"
                        confirmationText="Are you sure you want to delete this entries?"
                        confirmationYes="Yes, delete it"
                        visible={this.state.willDelete}
                        onConfirmation={this.onDeleteConfirmation.bind(this)}
                    />
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