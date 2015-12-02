'use strict';

import moment from 'moment';
import _ from 'lodash';
import alt from '../alt';
import EntriesActions from '../actions/EntriesActions';

class EntriesStore {
    constructor() {
        this.entries = [];
        this.id = 0;

        this.handleAddEntry({text: '...', time: '08:45'});
        this.handleAddEntry({text: 'stand up', time: '09:00'});
        this.handleAddEntry({text: '...', time: '09:15'});

        this.bindListeners({
            handleAddEntry: EntriesActions.ADD_ENTRY,
            handleUpdateEntry: EntriesActions.UPDATE_ENTRY,
            handleDeleteEntry: EntriesActions.DELETE_ENTRY
        });
    }

    //region handlers
    handleAddEntry(entry) {
        this.id++;

        this.entries.push({
            id: this.id,
            text: entry.text,
            time: entry.time,
            _time: moment(entry.time, 'HH:mm')
        });

        this.sort();
        this.computeDurations();
    }

    handleUpdateEntry(entry) {
        let index = _.findIndex(this.entries, {id: entry.id});

        this.entries[index] = _.assign(this.entries[index], {
            text: entry.text,
            time: entry.time,
            _time: moment(entry.time, 'HH:mm')
        });

        this.sort();
        this.computeDurations();
    }

    handleDeleteEntry(id) {
        _.remove(this.entries, {id});
        this.computeDurations();
    }

    //endregion

    sort() {
        this.entries = _.sortBy(this.entries, (entry) => entry._time);
    }

    computeDurations() {
        let hhmm = function (minutes) {
            let hours = Math.floor(minutes / 60);
            minutes = minutes % 60;
            return `0${hours}`.slice(-2) + ':' + `0${minutes}`.slice(-2);
        };

        if (this.entries.length == 0) {
            return;
        }

        let totalDuration = 0;

        _.assign(this.entries[this.entries.length - 1], {
            _duration: 0,
            duration: '-'
        });
        for (let i = 0; i < this.entries.length - 1; i++) {
            let first = this.entries[i];
            let second = this.entries[i + 1];

            this.entries[i]._duration = second._time.diff(first._time, 'minutes');
            this.entries[i].duration = hhmm(this.entries[i]._duration);

            totalDuration += this.entries[i]._duration;
        }

        this.totalDuration = hhmm(totalDuration);
    }
}

export default alt.createStore(EntriesStore, 'EntriesStore');