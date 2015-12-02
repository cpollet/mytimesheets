'use strict';

import React from 'react';

class ConfirmationModal extends React.Component {
    //region event handlers
    onClickYes() {
        this.props.onConfirmation(true);
    }

    onClickNo() {
        this.props.onConfirmation(false);
    }
    //endregion

    render() {
        if (!this.props.visible) {
            return null;
        }

        return (
            <div className="ui dimmer active">
                <div className="ui small modal active" style={{
                    top: '25%'
                }}>
                    <i className="close icon" onClick={this.onClickNo.bind(this)}/>
                    <div className="header">
                        <i className="question icon"/>
                        {this.props.confirmationTitle}
                    </div>
                    <div className="content">
                        <p>{this.props.confirmationText}</p>
                    </div>
                    <div className="actions">
                        <div className="ui red button" onClick={this.onClickNo.bind(this)}>
                            <i className="remove icon"/>
                            {this.props.confirmationNo}
                        </div>
                        <div className="ui green button" onClick={this.onClickYes.bind(this)}>
                            <i className="checkmark icon"/>
                            {this.props.confirmationYes}
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

ConfirmationModal.defaultProps = {
    visible: false,
    confirmationTitle: 'Confirmation',
    confirmationText: 'Are you sure?',
    confirmationYes: 'Yes',
    confirmationNo: 'No',
    onConfirmation: function () {
    }
};

export default ConfirmationModal;