import React from "react";
import { firebaseApp } from "../firebase";

import ListGame from "./ListGame";
import CreateGame from "./CreateGame";
import JoinGame from "./JoinGame";

class UserProfile extends React.Component {
  state = {
    ownedGames: null,
    joinedGames: {}
  };

// I need to wait for the data to be received.
// Might need to use a Promise, need to learn how that works

  componentDidMount() {
    this.getGames(newState => {
      console.log(newState);
      // Wait to set state till we get the games
      this.setState(newState);
    });
  }

  getGames(_callback) {
    let newState = { ...this.state };
    // Get all DM games
    firebaseApp
      .database()
      .ref("games")
      .orderByChild("owner")
      .equalTo(localStorage.getItem("user"))
      .once("value", data => {
        if (data.val()) {
          newState.ownedGames = data.val();
        }
      });
    // Get all player games
    firebaseApp
      .database()
      .ref("players")
      .orderByChild("player")
      .equalTo(localStorage.getItem("user"))
      .on("value", data => {
        // Object of games
        let games = data.val();
        // Get each game and map over them
        Object.values(games).forEach(value => {
          // value is ever game, value.game is the game id
          firebaseApp
            .database()
            .ref(`games/${value.game}`)
            .once("value", data => {
              // add to state as {"game id": {game info}}
              newState.joinedGames[value.game] = data.val();
              console.log(Object.keys(newState.joinedGames));
            });
        });
      });
    _callback(newState);
  }

  listGames = games => {
    let items = [];
    if (games) {
      console.log(Object.keys(games));
    }
    if (games) {
      Object.keys(games).forEach(key => {
        items.push(
          <ListGame
            currentGame={this.props.user.currentGame}
            details={games[key]}
            id={key}
            key={key}
          />
        );
      });
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
          <div className="col">
            <JoinGame />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col">
            <h3 className="row">DM Games</h3>
            {this.listGames(this.state.ownedGames)}
          </div>
          <div className="col">
            <h3>Player Games</h3>
            {this.listGames(this.state.joinedGames)}
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
