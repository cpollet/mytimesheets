'use strict';

import React from 'react';
import {Button} from 'react-semantify';

import Container from './Container.jsx';
import Table from './Table.jsx';
import EntryRow from './EntryRow.jsx';


class App extends React.Component {
    constructor() {
        super();
    }

    displaySummary() {
        console.log('clicked');
    }

    reset() {
        console.log('reset');
    }

    render() {
        return (
            <Container style={{margin: '10px'}}>

                <Table className="very basic">
                    <thead>
                    <tr>
                        <th className="two wide">Time start</th>
                        <th>Comment</th>
                        <th className="two wide">Duration</th>
                        <th className="two wide"/>
                    </tr>
                    </thead>
                    <tbody>
                    <EntryRow/>
                    </tbody>
                    <tfoot>
                    <tr>
                        <th colSpan="2"/>
                        <th>00:00</th>
                        <th></th>
                    </tr>
                    </tfoot>
                </Table>

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
