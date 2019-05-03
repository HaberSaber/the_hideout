import React from "react";
import { firebaseApp } from "../firebase";

class User extends React.Component {
  // componentWillMount() {
  //   if (firebaseApp.auth().currentUser === null){
  //     this.props.history.push("/")
  //   }
  // }

  // TODO:
  // Fix log in to not set state anymore

  logout = () => {
    firebaseApp
      .auth()
      .signOut()
      .then(
        function() {
          this.props.history.push("/");
        }.bind(this)
      );
  };

  render() {
    return (
      <div>
        <h1>User Page!</h1>
        <button className="btn btn-outline-danger" onClick={this.logout}>
          Log Out
        </button>
      </div>
    );
  }
}

export default User;
