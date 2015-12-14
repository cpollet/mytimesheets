'use strict';

import React from 'react';

import _ from 'lodash';

import {Button} from 'react-semantify';

import EntriesStore from '../stores/EntriesStore';
import EntriesAction from '../actions/EntriesActions';

import Table from '../components/Table.jsx';
import EntryRow from '../components/summary/EntryRow.jsx';

class Summary extends React.Component {
    // region react

    componentWillMount() {
        this.setState(EntriesStore.getState());
    }

    componentDidMount() {
        this.onChangeHandler = this.onChange.bind(this);

        EntriesStore.listen(this.onChangeHandler);
    }

    componentWillUnmount() {
        EntriesStore.unlisten(this.onChangeHandler);
    }

    // endregion

    // region callbacks

    onChange(state) {
        this.setState(state);
    }

    // endregion

    // region event handlers

    onDisplayEntries() {
        this.props.history.go(-1);
    }

    onValidate() {
        EntriesAction.accountSelected();
    }

    // endregion

    render() {
        let relevantEntries = _.filter(this.state.entries, e => e.duration !== '-' && !e.accounted);

        let rows = relevantEntries.map(
            entry =>
                <EntryRow key={entry.id}
                          id={entry.id}
                          text={entry.text}
                          duration={entry.duration}
                />
        );

        return (
            <div>
                <Table className="very basic">
                    <thead>
                    <tr>
                        <th>Comment</th>
                        <th className="one wide">Duration</th>
                        <th className="one wide">Taken</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td/>
                        <td>{this.state.selectedDuration}</td>
                        <td/>
                    </tr>
                    </tfoot>
                </Table>

                <div className="ui grid">
                    <div className="sixteen wide right aligned column">
                        <Button className="blue labeled icon" onClick={this.onDisplayEntries.bind(this)}>
                            <i className="plus icon"/>
                            Moar entries!
                        </Button>

                        <Button className="positive labeled icon"  onClick={this.onValidate.bind(this)}>
                            <i className="checkmark icon"/>
                            Ok
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Summary;