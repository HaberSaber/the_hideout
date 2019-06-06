import React from "react";
import { firebaseApp } from "../firebase";

class JoinGame extends React.Component {
  state = {
    joinIdError: false,
    joinError: false,
    dmError: false,
  };

  joinIdRef = React.createRef();

  joinGame = event => {
    event.preventDefault();
    let newState = { ...this.state };
    const joinId = this.joinIdRef.current.value;
    // Check if there is a Join ID given
    if (joinId.length === 0) {
      newState.joinIdError = true;
      this.setState(newState);
      return;
    }
    // Reset to false in case it was at one time true
    newState.joinIdError = false

    let joinError = false;
    let dmError = false;
    firebaseApp.database().ref("games/" + joinId).once('value').then(function(data) {
      // Check if there is a game with that ID
      if (!data.val()) {
        joinError = true;
      }
      // Check if the user owns the game
      if (data.val().owner === localStorage.getItem("user")) {
        console.log("This is your game");
        dmError = true;
      }
    })
    // If there is not a game
    if (joinError) {
      newState.joinError = true;
      this.setState(newState)
      return
    }
    if (dmError) {
      newState.dmError = true;
      this.setState(newState)
      return
    }
    // // Create Unqiue ID
    // const playerId = Date.now();
    // // Shortcut to database
    // let database = firebaseApp.database();
    // // Create Player in Firebase
    // database.ref("players/" + playerId).set({
    //   game: joinId,
    //   player: localStorage.getItem("user")
    // });
    // // Set game as the user's current game
    // database
    //   .ref(`users/${firebaseApp.auth().currentUser.uid}/currentGame`)
    //   .set(joinId);
    // window.location.reload();
  };

  render() {
    return (
      <div className="row ml-1">
        <h2>Join Game</h2>
        <form className="form-inline" onSubmit={this.joinGame}>
          <div className="form-group">
            <label htmlFor="joinId">Join ID:</label>
            <input
              className="form-control ml-1"
              type="text"
              ref={this.joinIdRef}
              name="joinId"
              placeholder="Join ID"
            />
          </div>
          <button type="submit" className="btn btn-outline-primary ml-1">
            Join Game
          </button>
        </form>
        {this.state.gameIdError && (
          <small className="text-danger">Join ID is required</small>
        )}
        {this.state.joinError && (
          <small className="text-danger">No Game with that Join ID</small>
        )}
        {this.state.dmError && (
          <small className="text-danger">You can't join a game that you DM</small>
        )}
      </div>
    );
  }
}

export default JoinGame;
