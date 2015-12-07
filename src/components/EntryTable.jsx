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

    //region react

    componentDidMount() {
        this.onChangeHandler = this.onChange.bind(this);

        EntriesStore.listen(this.onChangeHandler);
    }

    componentWillUnmount() {
        EntriesStore.unlisten(this.onChangeHandler);
    }

    //endregion

    //region callbacks
    onChange(state) {
        this.setState(state);
    }

    //endregion

    render() {
        let rows = this.state.entries.map(
            entry =>
                <EntryRow
                    key={entry.id}
                    id={entry.id}
                    initialText={entry.text}
                    initialTime={entry.time}
                    duration={entry.duration}
                    workingTime={entry.workingTime}
                />
        );

        return (
            <Table className="very basic">
                <thead>
                <tr>
                    <th className="two wide">Time start</th>
                    <th>Comment</th>
                    <th className="two wide">Duration</th>
                    <th className="two wide">Working time</th>
                    <th className="two wide"/>
                </tr>
                </thead>
                <tbody>
                {rows}
                <EntryRow workingTime={true}/>
                </tbody>
                <tfoot>
                <tr>
                    <th colSpan="2"/>
                    <th>{this.state.totalDuration}</th>
                    <th/>
                    <th/>
                </tr>
                </tfoot>
            </Table>
        );
    }
}

export default EntryTable;