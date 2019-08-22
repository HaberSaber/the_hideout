import React from "react";
import { firebaseApp } from "../firebase";

class ListGame extends React.Component {
  id = Number(this.props.id);
  owner = this.props.owner;
  currentGame = Number(this.props.currentGame)

  componentDidMount() {
    if (this.props.details["owner"] === localStorage.getItem("user")) {
      this.owner = true;
    }
  }

  swtichGame = () => {
    firebaseApp
      .database()
      .ref(`users/${localStorage.getItem("user")}/currentGame`)
      .set(this.id);
    window.location.reload();
  };

  deleteGame = () => {
    if (this.owner) {
      if (this.id === this.currentGame) {
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

  canDelete = () => {
    if (this.owner) {
      return (
        <button onClick={this.deleteGame} className="btn btn-outline-danger">
          Delete
        </button>
      );
    }
  };

  leaveGame = () => {
    if (!this.owner) {
      if (this.id === this.currentGame) {
        firebaseApp
          .database()
          .ref(`users/${localStorage.getItem("user")}/currentGame`)
          .set(null);
      }
      firebaseApp
        .database()
        .ref("players")
        .orderByChild("player")
        .equalTo(localStorage.getItem("user"))
        .once("value", data => {
          for (let playerId in data.val()) {
            let playerIdInt = Number(data.val()[playerId]["game"])
            if (playerIdInt === this.id) {
              console.log(playerId);
              firebaseApp.database().ref(`players/${playerId}`).remove()
            }
          }
        })
      window.location.reload();
    }
  };

  canLeave = () => {
    if (!this.owner) {
      return (
        <button onClick={this.leaveGame} className="btn btn-outline-danger">
          Leave Game
        </button>
      );
    }
  };

  currentGames = () => {
    if (this.id === this.currentGame) {
      return <p className="col">Current Game</p>;
    } else {
      return (
        <button onClick={this.swtichGame} className="col btn btn-success mr-1">
          Play
        </button>
      );
    }
  };

  render() {
    return (
      <div>
        <hr />
        <div className="row mt-3">
          <div className="col">
            <h4>{this.props.details.gangName}</h4>
          </div>
          <div className="col row">
            {this.currentGames()}
            {this.canDelete()}
            {this.canLeave()}
          </div>
        </div>
        {this.owner && (
          <div className="row">
            <p className="col">Join ID: {this.props.id}</p>
          </div>
        )}
      </div>
    );
  }
}

export default ListGame;
