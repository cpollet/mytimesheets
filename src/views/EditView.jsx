'use strict';

import React from 'react';

import {Button} from 'react-semantify';

import EntryTable from './../components/edit/EntryTable.jsx';
import ConfirmedButton from './../components/ConfirmedButton.jsx';

import EntriesAction from '../actions/EntriesActions';

class Entries extends React.Component {

    // region event handlers

    onReset() {
        EntriesAction.deleteAll();
    }

    onDisplaySummary() {
        this.props.history.pushState(null, '/summary');
    }

    // endregion

    render() {
        return (
            <div>
                <EntryTable/>
                <div className="ui grid">
                    <div className="sixteen wide right aligned column">
                        <ConfirmedButton
                            confirmationTitle="Reset timesheet"
                            confirmationText="Are you sure you want to reset the current timesheet?"
                            confirmationYes="Yes, reset everthing"
                            confirmationNo="No"
                            onClick={this.onReset.bind(this)}
                        >
                            <Button className="negative labeled icon">
                                <i className="remove icon"/>
                                Reset
                            </Button>
                        </ConfirmedButton>
                        <Button className="positive labeled icon" onClick={this.onDisplaySummary.bind(this)}>
                            <i className="checkmark icon"/>
                            Summary
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Entries;