'use strict';

import React from 'react';
import {Input, Button} from 'react-semantify';
import ConfirmedButton from './ConfirmedButton.jsx';
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
        if (e.keyCode === 9 || e.keyCode === 13) {
            this.save();
        }
    }

    onClickDelete() {
        EntriesAction.deleteEntry(this.props.id);
    }
    //endregion

    initialState() {
        return {
            dirty: false,
            text: this.props.initialText,
            time: this.props.initialTime
        };
    }

    isExistingEntry() {
        return typeof this.props.id !== 'undefined';
    }

    save() {
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

                this.refs.timeInput.focus();
            }
        }
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
                <ConfirmedButton
                    confirmationTitle="Delete entry"
                    confirmationText="Are you sure you want to delete this entries?"
                    confirmationYes="Yes, delete it"
                    onClick={this.onClickDelete.bind(this)}
                >
                    <Button className="compact negative icon">
                        <i className="minus icon"/>
                    </Button>
                </ConfirmedButton>
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
                <td>{buttons}</td>
            </tr>
        );
    }
}

export default EntryRow;