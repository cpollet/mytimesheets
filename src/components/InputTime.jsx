'use strict';

import React from 'react';

import {Input} from 'react-semantify';

class InputTime extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.initialValue
        };
    }

    //region event handlers

    onChange(e) {
        if (e.target.value == '') {
            this.setState({
                value: e.target.value
            });
        } else if (e.target.value.match(InputTime.timeRegex)) {
            this.setState({
                value: e.target.value
            }, function () {
                this.props.onChange(this.format());
            });
        }
    }

    onBlur(e) {
        if (this.state.value.match(InputTime.timeRegex)) {
            this.setState({
                value: this.format()
            });
        } else {
            e.target.focus();
        }
    }

    //endregion

    //region published method

    reset() {
        this.setState({
            value: this.props.initialValue
        });
    }

    focus() {
        this.refs.input.focus();
    }

    //endregion

    format() {
        let parts = InputTime.timeRegex.exec(this.state.value);
        let hours = parts[1];
        let minutes = (typeof parts[5] === 'undefined') ? '00' : `0${parts[5]}`.substr(-2);

        return `${hours}:${minutes}`;
    }

    render() {
        return (
            <Input>
                <input
                    ref="input"
                    type="text"
                    placeholder="h:mm"
                    value={this.state.value}
                    onChange={this.onChange.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                />
            </Input>
        );
    }

}

InputTime.timeRegex = /^(([0-1]?[0-9])|(2[0-3]))(:([0-5]?[0-9])?)?$/;

InputTime.defaultProps = {
    initialValue: '',
    onChange: function () {
    }
};

export default InputTime;