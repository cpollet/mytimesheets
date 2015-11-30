'use strict';

import assign from 'object-assign';

import {Dispatcher} from 'flux';

var AppDispatcher = assign(new Dispatcher(), {
    handleViewAction: function (action) {
        console.log('handleViewAction in AppDispatcher');
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    }
});

export default AppDispatcher;