import React from "react";
import base from "../firebase";

class Dashboard extends React.Component {
  state = {
    game: {},
    currentGame: undefined
  };

  componentDidMount() {
    let id = Number(this.props.user.currentGame);
    if (id) {
      base.syncState(`games/${id}`, {
        context: this,
        state: "game"
      });
      base.syncState(`users/${localStorage.getItem("user")}/currentGame`, {
        context: this,
        state: "currentGame"
      });
    }
    this.forceUpdate()
  }

  render() {
    return (
      <div>
        <p>Dashboard</p>
        <p>{this.state.currentGame}</p>
      </div>
    );
  };

}

export default Dashboard;
