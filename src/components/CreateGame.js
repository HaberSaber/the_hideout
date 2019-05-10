import React from "react";
import { firebaseApp } from "../firebase";

class CreateGame extends React.Component {
  state = {
    gangNameError: false
  };

  gangNameRef = React.createRef();

  createGame = event => {
    event.preventDefault();
    let newState = { ...this.state };
    const gangName = this.gangNameRef.current.value;
    if (gangName.length === 0) {
      newState.gangNameError = true;
      this.setState(newState);
      return;
    }
    // Create Unqiue ID
    const gameId = Date.now();
    // Shortcut to database
    let database = firebaseApp.database();
    // Create Game in Firebase
    database.ref("games/" + gameId).set({
      gangName: gangName.toLowerCase(),
      owner: firebaseApp.auth().currentUser.uid
    });
    // Set game as the user's current game
    database
      .ref(`users/${firebaseApp.auth().currentUser.uid}/currentGame`)
      .set(gameId);
  };

  render() {
    return (
      <div>
        <h2>New Game</h2>
        <form onSubmit={this.createGame}>
          <div className="form-group">
            <label htmlFor="gangName">Gang Name</label>
            <input
              className="form-control"
              type="text"
              ref={this.gangNameRef}
              name="gangName"
              placeholder="The Pineapple Gang"
            />
          </div>
          {this.state.gangNameError && (
            <small className="text-danger">Gang name is required</small>
          )}
          <button type="submit" className="btn btn-outline-primary">
            Create Game
          </button>
        </form>
      </div>
    );
  }
}

export default CreateGame;
