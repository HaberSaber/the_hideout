import React from "react";
import base, { firebaseApp } from "../firebase";

import Header from "./Header";

class Home extends React.Component {
  state = {
    user: {},
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
  };

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

  // NOTE: This is breaking the site and I am not sure why
  // 
  // changeTab = (tab) => {
  //   let newState = { ...this.state };
  //   newState.activeTab = tab;
  //   this.setState(newState);
  // };

  render() {
    return (
      <div className="p-3">
        <Header logout={this.logout} />
        <div className="row p-3">
          <div className="col-3 nav flex-column nav-pills">
            
            {/* NOTE: This breaks the site but I am not sure why */}

            {/* <a className={this.state.activeTab === "hideout" ? "nav-link show active" : "nav-link"}  onClick={this.changeTab("hideout")} href="#hideout">
              Hideout
            </a>
            <a className={this.state.activeTab === "character" ? "nav-link show active" : "nav-link"} onClick={this.changeTab("character")} href="#character">
              Character
            </a> */}
          </div>
          <div className="tab-content">
            {/* <div className="tab-pane fade show active" id="hideout">
              Hideout
            </div>
            <div className="tab-pane fade" id="character">
              Character
            </div> */}
          </div>
        </div>
        
      </div>
    );
  }
}

export default Home;
