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
        let value = e.target.value;
        if (value.match(/[0-9]{0,4}/)) {
            this.updateState(value, false);
        } else if (value.match(InputTime.timeRegex)) {
            this.updateState(value, true);
        }
    }

    onBlur(e) {
        let value = this.state.value;

        if (value.match(InputTime.timeRegex)) {
            this.updateState(this.format(), true);
            return;
        }

        if (value.match(/[0-9]{0,4}/)) {
            const minutesLength = 2;
            let hourLength = value.length - minutesLength;
            let tmpValue = value.substr(0, hourLength) + ':' + value.substr(hourLength, minutesLength);

            if (tmpValue.match(InputTime.timeRegex)) {
                this.updateState(tmpValue, true);
                return;
            }
        }

        if (value !== '') {
            e.target.focus();
        }
    }

    //endregion

    updateState(value, publish) {
        this.setState({
            value: value
        }, function () {
            if (publish) {
                this.props.onChange(this.format());
            }
        });
    }

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