'use strict';

import React from 'react';
import {Button} from 'react-semantify';

import Container from './Container.jsx';
import EntryTable from './EntryTable.jsx';

class App extends React.Component {
    constructor() {
        super();
    }

    displaySummary() {
        console.log('summary');
    }

    reset() {
        console.log('reset');
    }

    render() {
        return (
            <Container style={{margin: '10px'}}>

                <EntryTable/>

                <div className="ui grid">
                    <div className="sixteen wide right aligned column">
                        <Button className="negative labeled icon" onClick={this.reset}>
                            <i className="remove icon"/>
                            Reset
                        </Button>
                        <Button className="positive labeled icon" onClick={this.displaySummary}>
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
