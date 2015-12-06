'use strict';

import React from 'react';
import {Button} from 'react-semantify';

import Container from './Container.jsx';
import EntryTable from './EntryTable.jsx';
import ConfirmedButton from './ConfirmedButton.jsx';

import EntriesAction from '../actions/EntriesActions';

class App extends React.Component {
    constructor() {
        super();
    }

    //region event handlers
    onDisplaySummary() {
        console.log('summary');
    }

    onReset() {
        EntriesAction.deleteAll();
    }

    //endregion

    render() {
        return (
            <Container style={{margin: '10px'}}>
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
                        <Button className="positive labeled icon" onClick={this.onDisplaySummary}>
                            <i className="checkmark icon"/>
                            Summary
                        </Button>
                    </div>
                </div>
            </Container>
        );
    }
}

export default App;
