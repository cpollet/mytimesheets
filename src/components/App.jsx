'use strict';

import React from 'react';
import Container from './Container.jsx';

import {Button} from 'react-semantify';

class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Container>
                <Button>Click me</Button>
            </Container>
        );
    }
}

export default App;
