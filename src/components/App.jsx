'use strict';

import React from 'react';
import Container from './Container.jsx';

import {Button} from 'react-semantify';

class App extends React.Component {
    constructor() {
        super();
    }

    _onClick() {
        console.log('clicked');
    }

    render() {
        return (
            <Container>
                <Button onClick={this._onClick}>Click me</Button>
            </Container>
        );
    }
}

export default App;
