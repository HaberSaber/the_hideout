import React from "react";
import { Route } from "react-router-dom";
import base, { firebaseApp } from "../firebase";

import Header from "./Header";
import Dashboard from "./Dashboard";
import UserProfile from "./UserProfile";

class Home extends React.Component {
  state = {
    user: {}
    // activeTab: "hideout"
  };

  componentWillMount() {
    const id = this.isThereALoggedInUser();
    // Grab their profile if there is
    if (id) {
      base.syncState(`users/${id}`, {
        context: this,
        state: "user"
      });
    }
  }

  // Checks if there is a user logged in
  isThereALoggedInUser = () => {
    const id = localStorage.getItem("userId");
    if (id === null) {
      this.props.history.push("/");
    }
    return id;
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
          <Route path="/home/dashboard" render={() => (
            <Dashboard user={this.state.user} />
          )}/>
          <Route path="/home/user-profile" render={() => (
            <UserProfile user={this.state.user} />
          )}/>
        </div>
      </div>
    );
  }
}

export default Home;
