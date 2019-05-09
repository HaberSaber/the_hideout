import React from "react";
import Login from "./Login";
import Register from "./Register";

class LandingPage extends React.Component {
  signIn = () => {
    this.props.history.push("/home");
  };

  render() {
    return (
      <div className="p-3">
        <div className="row ">
          <div className="col">
            <Login signIn={this.signIn} />
          </div>
          <div className="col">
            <Register signIn={this.signIn} />
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
