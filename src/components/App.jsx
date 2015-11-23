import React from 'react';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            message: 'Hello from reactJS'
        };
    }

    render() {
        return (
           <b>{this.state.message}</b>
        );
    }
}

export default App;
