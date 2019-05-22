import React from "react";
import { firebaseApp } from "../firebase";

import ListGame from "./ListGame";
import CreateGame from "./CreateGame";

class UserProfile extends React.Component {
  state = {
    ownedGames: null
  };

  componentDidMount() {
    this.getOwnedGames();
  }

  getOwnedGames = () => {
    let newState = { ...this.state };
    firebaseApp
      .database()
      .ref("games")
      .orderByChild("owner")
      .equalTo(localStorage.getItem("user"))
      .once(
        "value",
        function(data) {
          if (data.val()) {
            newState.ownedGames = data.val();
            this.setState(newState);
          }
        }.bind(this)
      );
  };

  listOwnedGames = games => {
    let items = [];
    for (let key in games) {
      items.push(
        <ListGame
          currentGame={this.props.user.currentGame}
          owned={true}
          details={games[key]}
          id={key}
          key={key}
        />
      );
    }
    return items;
  };

  render() {
    return (
      <div className="col">
        <h2>Profile</h2>
        <hr />
        <div className="row">
          <div className="col">
            <CreateGame />
          </div>
          <div className="col" />
        </div>
        <hr />
        <div className="row">
          <div className="col">
            <h3 className="row">DM Games</h3>
            {this.listOwnedGames(this.state.ownedGames)}
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
