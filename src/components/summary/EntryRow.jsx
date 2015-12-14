'use strict';

import React from 'react';

import EntriesAction from '../../actions/EntriesActions';

class EntryRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        }
    }

    // region event handlers

    onChange(e) {
        this.setState({
            selected: e.target.checked
        }, function() {
            this.save();
        });
    }

    // endregion

    save() {
        EntriesAction.selectEntry({
            id: this.props.id,
            selected: this.state.selected
        });
    }

    render() {
        return (
            <tr id={this.props.id}>
                <td>{this.props.text}</td>
                <td>{this.props.duration}</td>
                <td>
                    <div className="ui toggle checkbox">
                        <input type="checkbox" name="public"
                               onChange={this.onChange.bind(this)}/>
                        <label/>
                    </div>
                </td>
            </tr>
        );
    }

}

export default EntryRow;