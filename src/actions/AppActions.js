'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

var AppActions = {
    create: function () {
        console.log('create in AppActions');
        AppDispatcher.handleViewAction({
            actionType: AppConstants.ENTRY_CREATE,
            text: ''
        });
    },

    destroy: function (id) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.ENTRY_DESTROY,
            id: id
        });
    }
};

export default AppActions;