'use strict';

import moment from 'moment';
import _ from 'lodash';
import alt from '../alt';
import EntriesActions from '../actions/EntriesActions';

class EntriesStore {
    constructor() {
        this.entries = [];
        this.id = 0;
        this.loading = false;

        this.load();

        this.bindListeners({
            handleAddEntry: EntriesActions.ADD_ENTRY,
            handleUpdateEntry: EntriesActions.UPDATE_ENTRY,
            handleDeleteEntry: EntriesActions.DELETE_ENTRY,
            handleDeleteAll: EntriesActions.DELETE_ALL
        });
    }

    //region handlers
    handleAddEntry(entry) {
        this.id++;

        this.entries.push({
            id: this.id,
            text: entry.text,
            time: entry.time,
            workingTime: entry.workingTime,
            _time: moment(entry.time, 'HH:mm')
        });

        this.sort();
        this.computeDurations();
        this.save();
    }

    handleUpdateEntry(entry) {
        let index = _.findIndex(this.entries, {id: entry.id});

        this.entries[index] = _.assign(this.entries[index], {
            text: entry.text,
            time: entry.time,
            workingTime: entry.workingTime,
            _time: moment(entry.time, 'HH:mm')
        });

        this.sort();
        this.computeDurations();
        this.save();
    }

    handleDeleteEntry(id) {
        _.remove(this.entries, {id});
        this.computeDurations();
        this.save();
    }

    handleDeleteAll() {
        this.entries = [];
        this.id = 0;
        this.computeDurations();
        this.save();
    }

    //endregion

    sort() {
        this.entries = _.sortBy(this.entries, (entry) => entry._time);
    }

    computeDurations() {
        let hhmm = function (minutes) {
            let hours = Math.floor(minutes / 60);
            minutes = minutes % 60;
            return hours + ':' + `0${minutes}`.slice(-2);
        };

        if (this.entries.length == 0) {
            this.totalDuration = '0:00';
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

            if (this.entries[i].workingTime) {
                totalDuration += this.entries[i]._duration;
            }
        }

        this.totalDuration = hhmm(totalDuration);
    }

    save() {
        if (this.loading) {
            return;
        }

        let entries = _.map(this.entries, (entry) => {
            return {
                text: entry.text,
                time: entry.time,
                workingTime: entry.workingTime
            }
        });

        localStorage.setItem('entries', JSON.stringify(entries));
    }

    load() {
        this.loading = true;

        this.entries = [];
        this.id = 0;

        let entries = JSON.parse(localStorage.getItem('entries'));

        _.forEach(entries, (entry) => {
            this.handleAddEntry(entry);
        });

        this.loading = false;
    }
}

export default alt.createStore(EntriesStore, 'EntriesStore');