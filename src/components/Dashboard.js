import React from "react";
// import base, { firebaseApp } from "../firebase";

class Dashboard extends React.Component {
  state = {
    game: {}
  };

  // TODO: Make this component grab the correct game, otherwise tell them they need to select one

  // shouldComponentUpdate(newProps) {
  //   return (this.props.user !== newProps.user)
  // }

  // componentDidUpdate() {
  //   console.log("update");
  //   if (this.props.user.currentGame) {
  //     console.log("game");
  //     base.syncState(`games/${this.props.user.currentGame}`, {
  //       context: this,
  //       state: "game"
  //     });
  //   } else {
  //     this.props.historyPush("/home/user-profile")
  //   }
  // }

  render() {
    return <p>Dashboad</p>;
  }
}

export default Dashboard;
