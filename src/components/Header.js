import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <div className="row justify-content-between p-3">
        <div className="row">
          <h2>The Hideout</h2>
        </div>
        <div className="row justify-content-end">
          <div className="col">
            <Link to="/home/dashboard">
              <button className="btn btn-primary">Hideout</button>
            </Link>
          </div>
          <div className="col">
            <Link to="/home/user-profile">
              <button className="btn btn-warning">Profile</button>
            </Link>
          </div>
          <div className="col">
            <button
              className="btn btn-outline-danger"
              onClick={this.props.logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
