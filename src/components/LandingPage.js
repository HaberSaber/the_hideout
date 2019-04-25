import React from "react";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";

class LandingPage extends React.Component {
  state = {
    user: null
  };

  signIn = newUser => {
    var user = { ...this.state.user };
    user = newUser;
    this.setState({ user }, () => {
      console.log(this.state.user);
      this.props.history.push(`/user/${this.state.user}`);
    });
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
