'use strict';

import React from 'react';
import {Button} from 'react-semantify';

import Container from './Container.jsx';
import EntryTable from './EntryTable.jsx';
import ConfirmedButton from './ConfirmedButton.jsx';
import MiniNotification from './MiniNotification.jsx';

import EntriesAction from '../actions/EntriesActions';
import EntriesStore from '../stores/EntriesStore';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            justSaved: false
        };
    }

    //region event handlers

    onDisplaySummary() {
        console.log('summary');
    }

    onReset() {
        EntriesAction.deleteAll();
    }

    onChange() {
        this.setState({
            justSaved: true
        });
    }

    //endregion

    //region react

    componentDidMount() {
        this.onChangeHandler = this.onChange.bind(this);

        EntriesStore.listen(this.onChangeHandler);
    }

    componentWillUnmount() {
        EntriesStore.unlisten(this.onChangeHandler);
    }

    // endregion react

    render() {
        return (
            <div>
                <MiniNotification
                    visible={this.state.justSaved}
                    text="Changes saved"
                />
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
            </div>
        );
    }
}

export default App;
