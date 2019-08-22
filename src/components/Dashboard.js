import React from "react";
import { Link, Route } from "react-router-dom";
import base from "../firebase";

import Hideout from "./Hideout";

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
      <div className="col">
        <h2>{this.state.game["gangName"]}</h2>
        <p>{this.state.currentGame}</p>
        <div className="row">
          <div className="col-3 bg-light">
            <div className="p-2">
              <Link to="/dashboard/hideout">
                <button className="btn btn-primary">Hideout</button>
              </Link>
            </div>
            <div className="p-2">
              <Link to="/dashboard/theparty">
                <button className="btn btn-primary">The Party</button>
              </Link>
            </div>
          </div>
          <div className="col-9">
            <Route path="/dashboard/hideout" render={() => (
              <Hideout />
            )}/>
            <Route path="/dashboard/theparty" render={() => (
              // <Party />
              <h2>Coming soon</h2>
            )}/>
          </div>
        </div>
      </div>
    );
  };

}

export default Dashboard;
