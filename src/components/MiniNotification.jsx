'use strict';

import React from 'react';

class MiniNotification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: props.visible
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible
        }, function () {
            setTimeout(function () {
                this.setState({
                    visible: false
                })
            }.bind(this), this.props.delay);
        });
    }

    render() {
        return (
            <div style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    padding: '2px 1em',
                    backgroundColor: 'gray',
                    color: 'white',
                    fontSize: 'smaller',
                    borderBottomLeftRadius: '0.285714rem',
                    visibility: this.state.visible ? 'visible' : 'hidden'
                }}>
                {this.props.text}
            </div>
        );
    }
}

MiniNotification.defaultProps = {
    visible: false,
    delay: 1000
};

export default MiniNotification;