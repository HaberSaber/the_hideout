import React from 'react';

class App extends React.Component {
  logout = () => {
    // user = null;
    // this.setState({ user })
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <h1>User Page!</h1>
        <button className="btn btn-outline-danger" onClick={this.logout}>Log Out</button>
      </div>
    );
  }
}

export default App;