import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  
  render() {
    return (
      <div className="row">
        <div className="col-9">
          <h2>The Hideout</h2>
        </div>
        <div className="col-1">
          <Link to="/home/dashboard">
            <button className="btn btn-primary">Hideout</button>
          </Link>
        </div>
        <div className="col-1">
          <Link to="/home/user-profile">
            <button className="btn btn-warning">Profile</button>
          </Link>
        </div>
        <div className="col-1">
          <button
            className="btn btn-outline-danger"
            onClick={this.props.logout}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
