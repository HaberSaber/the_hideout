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

  homeRendered = false;

  componentDidMount() {
    const id = this.isThereALoggedInUser();
    // Grab their profile if there is
    if (id) {
      base.syncState(`users/${id}`, {
        context: this,
        state: "user"
      });
    }
    this.homeRendered = true;
  }

  historyPush = url => {
    this.props.history.push(url);
  }

  // Checks if there is a user logged in
  isThereALoggedInUser = () => {
    const id = localStorage.getItem("user");
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

  render() {
    return (
      <div className="p-3">
        <Header logout={this.logout} firstName={this.state.user.firstName} />
        <div className="row p-3">
          <Route path="/dashboard" render={() => (
            this.homeRendered && <Dashboard historyPush={this.historyPush} user={this.state.user} />
          )}/>
          <Route path="/user-profile" render={() => (
            <UserProfile user={this.state.user} />
          )}/>
        </div>
      </div>
    );
  }
}

export default Home;
