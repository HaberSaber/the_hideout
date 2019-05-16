import React from "react";
import { firebaseApp } from "../firebase";

class ListGame extends React.Component {
  id = Number(this.props.id)

  swtichGame = () => {
    console.log(localStorage.getItem("user"));
    firebaseApp
      .database()
      .ref(`users/${localStorage.getItem("user")}/currentGame`)
      .set(this.id);
  };

  currentGame = () => {
    console.log("id:" + this.id);
    console.log(this.props.currentGame);
    if (this.id === this.props.currentGame) {
      return <p className="col">Current Game</p>
    } else {
      // Add switchGame function onClick, it was breaking after infinate loop
      return <button className="col btn btn-success mr-1">Play</button>
    }
  }

  render() {
    return (
      <div className="row mt-3">
        <div className="col">
          <p>{this.props.details.gangName}</p>
        </div>
        <div className="col row">
          {this.currentGame()}
          <button className="btn btn-outline-danger">Delete</button>
        </div>
      </div>
    );
  }
}

export default ListGame;
