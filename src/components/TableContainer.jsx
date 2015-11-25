'use strict';

import React from 'react';

require('./TableContainer.scss');

class TableContainer extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
           <div className="tableContainer">
               {this.props.children}
           </div>
        );
    }
}

export default TableContainer;