import React from "react";
import { firebaseApp } from "../firebase";

import ListGame from "./ListGame";

class UserProfile extends React.Component {
  state = {
    ownedGames: null
  };

  componentWillMount() {
    this.getOwnedGames();
  }

  getOwnedGames = () => {
    let newState = { ...this.state };
    firebaseApp
      .database()
      .ref("games")
      .orderByChild("owner")
      .equalTo(localStorage.getItem("user"))
      .once("value", function(data) {
        if (data.val()) {
          newState.ownedGames = data.val();
          this.setState(newState);
        }
      }.bind(this));
  };

  listGames = games => {
    let items = [];
    for (let key in games) {
      items.push(<ListGame currentGame={this.props.user.currentGame} details={games[key]} id={key} key={key} />);
    }
    return items;
  };

  render() {
    return (
      <div className="col">
        <h2>Your Games</h2>
        <hr />
        <div className="row">
          <div className="col">
            <h3 className="row">DM Games</h3>
            {this.listGames(this.state.ownedGames)}
          </div>
          <div className="col">
            <h3>Player Games</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
