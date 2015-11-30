'use strict';

import assign from 'object-assign';

import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import AppConstants from '../constants/AppConstants';

var CHANGE_EVENT = 'change';

var _entries = {};

function create() {
    console.log('create in AppStore');
}

function destroy() {
    console.log('destroy in AppStore');
}

var AppStore = assign({}, EventEmitter.prototype, {
    getAll: function () {
        return _entries;
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherIndex: AppDispatcher.register(function (payload) {
        console.log('AppStore callback');
        var action = payload.action;
        var text;

        switch (action.actionType) {
            case AppConstants.ENTRY_CREATE:
                // text = action.text.trim();
                // if (text !== '') {
                create(text);
                AppStore.emitChange();
                // }
                break;

            case AppConstants.ENTRY_DESTROY:
                destroy(action.id);
                AppStore.emitChange();
                break;
        }

        return true;
    })
});

export default AppStore;