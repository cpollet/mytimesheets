'use strict';

import React from 'react';
import _ from 'lodash';
import {Input, Button, Checkbox} from 'react-semantify';
import ConfirmedButton from './../ConfirmedButton.jsx';
import InputTime from './../InputTime.jsx';
import EntriesAction from '../../actions/EntriesActions';

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

    onTimeChange(newValue) {
        this.setState({
            dirty: true,
            time: newValue
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

    onCheckedChange(e) {
        this.setState({
            dirty: true,
            workingTime: e.target.checked
        }, function () {
            this.save();
        });
    }

    onBlur() {
        this.save();
    }

    //endregion

    initialState() {
        return {
            dirty: false,
            text: this.props.initialText,
            time: this.props.initialTime,
            workingTime: this.props.workingTime,
            saving: 0
        };
    }

    isExistingEntry() {
        return typeof this.props.id !== 'undefined';
    }

    save() {
        this.setState(function (previousState) {
            return {
                saving: previousState.saving + 1
            }
        }, function () {
            if (this.state.saving === 1) {
                if (this.shouldSave()) {
                    let entry = {
                        text: this.state.text,
                        time: this.state.time,
                        workingTime: this.state.workingTime
                    };

                    if (this.isExistingEntry()) {
                        EntriesAction.updateEntry(_.assign(entry, {
                            id: this.props.id
                        }));

                        this.setState({
                            dirty: false
                        });
                    } else {
                        EntriesAction.addEntry(entry);

                        this.setState(this.initialState());
                        this.refs.timeInput.reset();
                        this.refs.timeInput.focus();
                    }
                }

                this.setState({
                    saving: 0
                });
            }
        }.bind(this));
    }

    shouldSave() {
        return this.state.dirty
            && (typeof this.state.text !== 'undefined' && this.state.text !== '')
            && (typeof this.state.time !== 'undefined' && this.state.time !== '');
    }

    render() {
        let deleteButton, workingHoursCheckbox;

        if (this.isExistingEntry()) {
            deleteButton = (
                <div>
                    <ConfirmedButton
                        confirmationTitle="Delete entry"
                        confirmationText="Are you sure you want to delete this entries?"
                        confirmationYes="Yes, delete it"
                        onClick={this.onClickDelete.bind(this)}
                    >
                        <Button className="compact mini negative circular icon">
                            <i className="remove icon"/>
                        </Button>
                    </ConfirmedButton>
                </div>
            );

            workingHoursCheckbox = (
                <div>
                    <div className="ui toggle checkbox">
                        <input type="checkbox" name="public" defaultChecked={this.state.workingTime}
                               onChange={this.onCheckedChange.bind(this)}/>
                        <label/>
                    </div>
                </div>
            );
        }

        return (
            <tr>
                <td>
                    <InputTime
                        ref="timeInput"
                        initialValue={this.props.initialTime}
                        onChange={this.onTimeChange.bind(this)}
                        onBlur={this.onBlur.bind(this)}
                    />
                </td>
                <td>
                    <Input className="fluid">
                        <input
                            type="text"
                            placeholder="Comment"
                            value={this.state.text}
                            onChange={this.onTextChange.bind(this)}
                            onKeyDown={this.onKeyDown.bind(this)}
                            onBlur={this.onBlur.bind(this)}
                        />
                    </Input>
                </td>
                <td>{this.props.duration}</td>
                <td>{workingHoursCheckbox}</td>
                <td>{deleteButton}</td>
            </tr>
        );
    }
}

export default EntryRow;