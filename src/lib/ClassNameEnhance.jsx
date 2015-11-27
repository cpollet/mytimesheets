'use strict';

import React from 'react';

var ClassNameEnhance = (ComposedComponent, classNames) => class extends React.Component {
    render() {
        if (typeof this.props.className !== 'undefined') {
            classNames = `${classNames} ${this.props.className}`;
        }

        this.props = Object.assign({}, this.props, {className: classNames});

        return <ComposedComponent {...this.props} {...this.state} />;
    }
};

export default ClassNameEnhance;