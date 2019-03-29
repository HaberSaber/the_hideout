import React from 'react';

// Dynamic Component

class Example extends React.Component {
  // Called when component is created
  componentDidMount() {
    // Function passed from parent component App
    this.props.exampleFunction()
  }

  render() {
    return (
      <p>Example App</p>
    );
  }
}

// Static Component

// const Example = () => (
//   <p>Stuff</p>
// );

export default Example;