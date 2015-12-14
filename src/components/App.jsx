'use strict';

import React from 'react';

import Container from './Container.jsx';
import MiniNotification from './MiniNotification.jsx';
import EntriesStore from '../stores/EntriesStore';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            justSaved: false
        };
    }

    //region event handlers

    onChange() {
        this.setState({
            justSaved: true
        });
    }

    //endregion

    //region react

    componentDidMount() {
        this.onChangeHandler = this.onChange.bind(this);

        EntriesStore.listen(this.onChangeHandler);
    }

    componentWillUnmount() {
        EntriesStore.unlisten(this.onChangeHandler);
    }

    // endregion react

    render() {
        return (
            <div>
                <MiniNotification
                    visible={this.state.justSaved}
                    text="Changes saved"
                />
                <Container style={{margin: '10px'}}>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}

export default App;
