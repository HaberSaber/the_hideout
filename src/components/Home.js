import React from "react";
import { Route, Link } from "react-router-dom";
import base, { firebaseApp } from "../firebase";

import Header from "./Header";
import CreateGame from "./CreateGame";
import Dashboard from "./Dashboard";
import UserProfile from "./UserProfile";

class Home extends React.Component {
  state = {
    user: {}
    // activeTab: "hideout"
  };

  componentWillMount() {
    const user = this.isThereALoggedInUser();
    // Grab their profile if there is
    if (user) {
      base.syncState(`users/${user.uid}`, {
        context: this,
        state: "user"
      });
    }
  }

  // Checks if there is a user logged in
  isThereALoggedInUser = () => {
    const user = firebaseApp.auth().currentUser;
    if (user === null) {
      this.props.history.push("/");
    }
    return user;
  };

  logout = () => {
    firebaseApp
      .auth()
      .signOut()
      .then(
        function() {
          this.props.history.push("/");
        }.bind(this)
      )
      .catch(function(error) {
        // Leaving in case there is ever an error
        console.log(error.code);
        console.log(error.message);
      });
  };

  changeGame = id => {
    let newState = { ...this.state };
    newState.user.currentGame = id;
    this.setState(newState);
  };

  render() {
    return (
      <div className="p-3">
        <Header logout={this.logout} firstName={this.state.user.firstName} />
        <div className="row p-3">
          <CreateGame />

          <Route path="/home/dashboard" component={Dashboard} />
          <Route path="/home/user-profile" component={UserProfile} />
        </div>
      </div>
    );
  }
}

export default Home;
