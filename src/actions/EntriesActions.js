'use strict';

import alt from '../alt';

class EntriesActions {
    addEntry(entry) {
        this.dispatch(entry);
    }

    updateEntry(entry) {
        this.dispatch(entry);
    }

    deleteEntry(id) {
        this.dispatch(id);
    }

    deleteAll() {
        this.dispatch();
    }

    selectEntry(entry) {
        this.dispatch(entry);
    }

    accountSelected() {
        this.dispatch();
    }
}

export default alt.createActions(EntriesActions);