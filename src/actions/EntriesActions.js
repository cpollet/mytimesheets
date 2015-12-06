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

    deleteAll(id) {
        this.dispatch();
    }
}

export default alt.createActions(EntriesActions);