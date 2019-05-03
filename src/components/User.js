import React from 'react';
import {firebaseApp} from "../firebase";

class User extends React.Component {
  state = {
    user: firebaseApp.auth().currentUser.uid
  }
  
  logout = () => {
    this.props.history.push("/");
  }
  
  componentDidMount() {
    console.log(this.state.user);
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

export default User;