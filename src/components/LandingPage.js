import React from "react";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";

class LandingPage extends React.Component {

  signIn = () => {
    this.props.history.push("/user");
  };

  render() {
    return (
      <div>
        <Header />
        <div>
          <div className="row ">
            <div className="col">
              <Login signIn={this.signIn} />
            </div>
            <div className="col">
              <Register signIn={this.signIn} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
