'use strict';

import React from 'react';
import Table from './Table.jsx';
import EntryRow from './EntryRow.jsx';
import EntriesStore from '../stores/EntriesStore';

class EntryTable extends React.Component {
    constructor() {
        super();
        this.state = EntriesStore.getState();
    }

    _onChange(state) {
        this.setState(state);
    }

    componentDidMount() {
        this.onChangeHandler = this._onChange.bind(this);

        EntriesStore.listen(this.onChangeHandler);
    }

    componentWillUnmount() {
        EntriesStore.unlisten(this.onChangeHandler);
    }

    render() {
        let rows = this.state.entries.map(
            entry =>
                <EntryRow
                    key={entry.id}
                    id={entry.id}
                    initialText={entry.text}
                    initialTime={entry.time}
                />
        );

        return (
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
                {rows}
                <EntryRow ref="newRow"/>
                </tbody>
                <tfoot>
                <tr>
                    <th colSpan="2"/>
                    <th>00:00</th>
                    <th/>
                </tr>
                </tfoot>
            </Table>
        );
    }
}

export default EntryTable;