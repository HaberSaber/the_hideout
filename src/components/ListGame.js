import React from "react";
import { firebaseApp } from "../firebase";

class ListGame extends React.Component {
  id = Number(this.props.id);

  swtichGame = () => {
    firebaseApp
      .database()
      .ref(`users/${localStorage.getItem("user")}/currentGame`)
      .set(this.id);
    // window.location.reload();
  };

  deleteGame = () => {
    if (this.props.owned) {
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

  canDelete = () => {
    if (this.props.owned) {
      return (
        <button onClick={this.deleteGame} className="btn btn-outline-danger">
          Delete
        </button>
      );
    }
  };

  currentGames = () => {
    if (this.id === this.props.currentGame) {
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
        <hr/>
        <div className="row mt-3">
          <div className="col">
            <h4>{this.props.details.gangName}</h4>
          </div>
          <div className="col row">
            {this.currentGames()}
            {this.canDelete()}
          </div>
        </div>
        <div className="row">
          <p className="col">Join ID: {this.props.id}</p>
        </div>
      </div>
    );
  }
}

export default ListGame;
