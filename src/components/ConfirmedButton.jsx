'use strict';

import React from 'react';

import ConfirmationModal from './ConfirmationModal.jsx';

class ConfirmedButton extends React.Component {
    constructor() {
        super();
        this.state = {
            modalDisplayed: false
        };
    }

    //region event handlers
    onClick() {
        this.setState({
            modalDisplayed: true
        });
    }

    onConfirmation(result) {
        this.setState({
            modalDisplayed: false
        });

        if (result) {
            this.props.onClick();
        }
    }
    //endregion

    render() {
        return (
            <span>
                <ConfirmationModal
                    confirmationTitle={this.props.confirmationTitle}
                    confirmationText={this.props.confirmationText}
                    confirmationYes={this.props.confirmationYes}
                    conformationNo={this.props.confirmationNo}
                    visible={this.state.modalDisplayed}
                    onConfirmation={this.onConfirmation.bind(this)}
                />
                <span onClick={this.onClick.bind(this)}>
                    {this.props.children}
                </span>
            </span>
        );
    }
}

ConfirmedButton.defaultProps = {
    confirmationTitle: 'Confirmation',
    confirmationText: 'Are you sure?',
    confirmationYes: 'Yes',
    confirmationNo: 'No',
    onClick: function () {
    },
    children: <button>Click me</button>
};

export default ConfirmedButton;