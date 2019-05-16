import React from "react";
import { firebaseApp } from "../firebase";

class Login extends React.Component {
  state = {
    emailError: false,
    passwordError: false,
    emailFormatError: false,
    userNotFoundError: false,
    wrongPasswordError: false
  };

  emailRef = React.createRef();
  passwordRef = React.createRef();

  login = event => {
    event.preventDefault();
    const user = {
      email: this.emailRef.current.value,
      password: this.passwordRef.current.value
    };
    let newState = { ...this.state };
    let stateChange = false;

    // Validate that the fields are filled in
    for (let key in user) {
      if (user[key].length === 0) {
        newState[key + "Error"] = true;
        stateChange = true;
      } else {
        if (newState[key + "Error"] === true) {
          newState[key + "Error"] = false;
          stateChange = true;
        }
      }
    }

    // Change state if there was a change
    if (stateChange) {
      this.setState(newState);
      // Check if any errors are in the new state, only continues when there are no errors
      const newStateHasError = Object.values(newState).some(value => value);
      if (newStateHasError) {
        return;
      }
    }

    // Sign in with Firebase
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(
        function(firebaseUser) {
          this.props.signIn(firebaseUser.user.uid);
        }.bind(this)
      )
      .catch(
        function(error) {
          console.log(error);
          // Reset all errors
          newState.emailFormatError = false;
          newState.userNotFoundError = false;
          newState.wrongPasswordError = false;

          // Then resets them if there is still an error
          if (error.code === "auth/invalid-email") {
            newState.emailFormatError = true;
          }
          if (error.code === "auth/user-not-found") {
            newState.userNotFoundError = true;
          }
          if (error.code === "auth/wrong-password") {
            newState.wrongPasswordError = true;
          }
          this.setState(newState);
          return;
        }.bind(this)
      );
  };

  render() {
    return (
      <div>
        <h2>Login</h2>
        {this.state.userNotFoundError && (
          <strong className="text-danger">Email is invaild</strong>
        )}
        {this.state.wrongPasswordError && (
          <strong className="text-danger">Password is invaild</strong>
        )}
        <form onSubmit={this.login}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              type="text"
              ref={this.emailRef}
              name="email"
              placeholder="Email"
            />
            {this.state.emailError && (
              <small className="text-danger">Email is required</small>
            )}
            {this.state.emailFormatError && (
              <small className="text-danger">Invaild email format</small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              ref={this.passwordRef}
              name="password"
              placeholder="Password"
            />
            {this.state.passwordError && (
              <small className="text-danger">Password is required</small>
            )}
          </div>
          <button type="submit" className="btn btn-outline-success">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
