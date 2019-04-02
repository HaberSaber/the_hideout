import React, { Component } from 'react';
// import base from "../firebase";
import Example from './Example';
import Header from './Header';

class App extends Component {
  exampleFunction = params => {
    console.log("example");
  }

  render() {
    return (
      <div>
        <Header />
        <p>App Component</p>
        <Example exampleFunction={this.exampleFunction} />
      </div>
    );
  }
}

export default App;
