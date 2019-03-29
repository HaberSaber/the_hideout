import React, { Component } from 'react';
// import base from "../firebase";
import Example from './Example';

class App extends Component {
  exampleFunction = params => {
    console.log("example");
  }

  render() {
    return (
      <div>
        <p>App Component</p>
        <Example exampleFunction={this.exampleFunction} />
      </div>
    );
  }
}

export default App;
