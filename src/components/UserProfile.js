import React from "react";
import { firebaseApp } from "../firebase";

import ListGame from "./ListGame";
import CreateGame from "./CreateGame";
import JoinGame from "./JoinGame";

class UserProfile extends React.Component {
  state = {
    ownedGames: {},
    joinedGames: {}
  };

  componentDidMount() {
    this.getGames(newState => {
      this.setState(newState);
    });
  }

  getGames(_callback) {
    let newState = { ...this.state };
    let dmReady = false;
    let playerReady = false;
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
      })
      .then((dmReady = true));
    // Get all player games
    firebaseApp
      .database()
      .ref("players")
      .orderByChild("player")
      .equalTo(localStorage.getItem("user"))
      .on("value", data => {
        // Object of games
        let games = data.val();
        if (games) {
          // Get each game and map over them
          Object.values(games).forEach(value => {
            // value is ever game, value.game is the game id
            firebaseApp
              .database()
              .ref(`games/${value.game}`)
              .once("value", data => {
                // add to state as {"game id": {game info}}
                newState.joinedGames[value.game] = data.val();
              })
              .then((playerReady = true));
          });
        }
        else {
          playerReady = true;
        }
      });
    let checkIfDone = setInterval(() => {
      console.log("Player: " + playerReady);
      if (dmReady && playerReady) {
        _callback(newState);
        clearInterval(checkIfDone);
      }
    }, 350);
  }

  listGames = (games, owner) => {
    let items = [];
    console.log();
    if (games) {
      Object.keys(games).forEach(key => {
        items.push(
          <ListGame
            currentGame={this.props.user.currentGame}
            details={games[key]}
            owner={owner}
            id={key}
            key={key}
          />
        );
      });
    }
    return items;
  };

  createGame = gangName => {
    if (gangName) {
      // Create Unqiue ID
      const gameId = Date.now();
      // Shortcut to database
      let database = firebaseApp.database();
      // Create the game as title case
      let stringLower = gangName.toLowerCase();
      let stringSplit = stringLower.split(" ");
      for (let i = 0; i < stringSplit.length; i++) {
        // Capitalize the first letter and add the rest of the word to the end
        stringSplit[i] = stringSplit[i].charAt(0).toUpperCase() + stringSplit[i].slice(1);
      }
      // Combine the words back togther
      let name = stringSplit.join(" ");
      // Create Game in Firebase
      database.ref("games/" + gameId).set({
        gangName: name,
        owner: localStorage.getItem("user")
      });
      // Set game as the user's current game
      database
        .ref(`users/${firebaseApp.auth().currentUser.uid}/currentGame`)
        .set(gameId);
      this.getGames(newState => {
        this.setState(newState);
      });
    }
  };

  joinGame = joinId => {
    // Create Unqiue ID
    const playerId = Date.now();
    // Shortcut to database
    let database = firebaseApp.database();
    // Create Player in Firebase
    database.ref("players/" + playerId).set({
      game: joinId,
      player: localStorage.getItem("user")
    });
    // Set game as the user's current game
    database
      .ref(`users/${firebaseApp.auth().currentUser.uid}/currentGame`)
      .set(joinId);
    this.getGames(newState => {
      this.setState(newState);
    });
  };

  deleteGame = () => {
    if (this.owner) {
      if (this.id === this.props.currentGame) {
        firebaseApp
          .database()
          .ref(`users/${localStorage.getItem("user")}/currentGame`)
          .set(null);
      }
      firebaseApp
        .database()
        .ref(`games/${this.id}`)
        .remove();
      window.location.reload();
    }
  };

  render() {
    return (
      <div className="col">
        <h2>Profile</h2>
        <hr />
        <div className="row">
          <div className="col">
            <CreateGame createGame={this.createGame} />
          </div>
          <div className="col">
            <JoinGame joinGame={this.joinGame} />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col">
            <h3 className="row">DM Games</h3>
            {this.listGames(this.state.ownedGames, true)}
          </div>
          <div className="col">
            <h3>Player Games</h3>
            {this.listGames(this.state.joinedGames, false)}
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
