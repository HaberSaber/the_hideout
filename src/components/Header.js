import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-4">
          <h2>The Hideout</h2>
        </div>
        <div className="col row justify-content-end">
          <div className="col-2">
            <Link to="/home/dashboard">
              <button className="btn btn-primary">Hideout</button>
            </Link>
          </div>
          <div className="col-2">
            <Link to="/home/user-profile">
              <button className="btn btn-warning">Profile</button>
            </Link>
          </div>
          <div className="col-2">
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
