'use strict';

import alt from '../alt';

class EntriesActions {
    addEntry(entry) {
        this.dispatch(entry);
    }

    updateEntry(entry) {
        this.dispatch(entry);
    }
}

export default alt.createActions(EntriesActions);