'use strict';

import React from 'react';

import ClassNameEnhance from '../lib/ClassNameEnhance.jsx';

class Container extends React.Component {
    render() {
        return (
           <div className={this.props.className} style={this.props.style}>
               {this.props.children}
           </div>
        );
    }
}

export default ClassNameEnhance(Container, 'ui container');