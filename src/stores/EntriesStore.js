'use strict';

import assign from 'object-assign';
import moment from 'moment';
import _ from 'lodash';
import alt from '../alt';
import EntriesActions from '../actions/EntriesActions';

class EntriesStore {
    constructor() {
        this.id = 1;
        this.entries = [
            {id: 0, text: 'Admin', time: '08:15', _time: moment('08:15', 'HH:mm')},
            {id: 1, text: 'Stand up', time: '09:00', _time: moment('09:00', 'HH:mm')}
        ];

        this.bindListeners({
            handleAddEntry: EntriesActions.ADD_ENTRY,
            handleUpdateEntry: EntriesActions.UPDATE_ENTRY,
            handleDeleteEntry: EntriesActions.DELETE_ENTRY
        });
    }

    handleAddEntry(entry) {
        this.id++;

        this.entries.push({
            id: this.id,
            text: entry.text,
            time: entry.time,
            _time: moment(entry.time, 'HH:mm')
        });

        this._sort();
    }

    _sort() {
        this.entries = _.sortBy(this.entries, (entry) => entry._time);
    }

    handleUpdateEntry(entry) {
        let index = _.findIndex(this.entries, {id: entry.id});

        this.entries[index] = assign(this.entries[index], {
            text: entry.text,
            time: entry.time,
            _time: moment(entry.time, 'HH:mm')
        });

        this._sort();
    }

    handleDeleteEntry(id) {
        console.log('removing', id)
        _.remove(this.entries, {id});
    }
}

export default alt.createStore(EntriesStore, 'EntriesStore');