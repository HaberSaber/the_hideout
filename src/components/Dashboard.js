import React from "react";
import base from "../firebase";

class Dashboard extends React.Component {
  state = {
    game: {},
  };

  componentDidMount() {
    const id = this.props.user.currentGame;
    if (id) {
      base.syncState(`games/${id}`, {
        context: this,
        state: "game"
      });
    }
  }

  render() {
    return (
      <div>
        <p>Dashboard</p>
      </div>
    );
  }
}

export default Dashboard;
