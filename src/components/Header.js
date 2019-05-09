import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div className="row justify-content-between">
        <div className="col col-4">
          <h2>The Hideout</h2>
        </div>
        <div className="col col-2">
          <button className="btn btn-outline-danger" onClick={this.props.logout}>
            Log Out
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
