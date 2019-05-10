import React from "react";
import { firebaseApp } from "../firebase";

class Register extends React.Component {
  state = {
    firstNameError: false,
    lastNameError: false,
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
    emailFormatError: false,
    emailInUseError: false,
    weakPasswordError: false,
    passwordMatchError: false
  };

  firstNameRef = React.createRef();
  lastNameRef = React.createRef();
  emailRef = React.createRef();
  passwordRef = React.createRef();
  confirmPasswordRef = React.createRef();

  register = event => {
    event.preventDefault();
    const user = {
      firstName: this.firstNameRef.current.value,
      lastName: this.lastNameRef.current.value,
      email: this.emailRef.current.value,
      password: this.passwordRef.current.value,
      confirmPassword: this.confirmPasswordRef.current.value
    };
    let newState = { ...this.state };
    let stateChange = false;

    // Validate which fields have been filled out and what ones have not
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
    // Reset to false for multiple checks
    newState.passwordMatchError = false;

    // Check if passwords match
    if (user.password !== user.confirmPassword) {
      newState.passwordMatchError = true;
      newState.passwordError = false;
      newState.confirmPasswordError = false;
      stateChange = true;
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

    // Add user to auth
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      // Add user profile
      .then(
        function() {
          firebaseApp
            .database()
            .ref("users/" + firebaseApp.auth().currentUser.uid)
            .set({
              firstName: user.firstName.toLowerCase(),
              lastName: user.lastName.toLowerCase(),
              email: user.email.toLowerCase()
            });
          this.props.signIn();
        }.bind(this)
      )
      .catch(
        function(error) {
          console.log(error.code);
          if (error.code === "auth/invalid-email") {
            newState.emailFormatError = true;
          } else {
            newState.emailFormatError = false;
          }
          if (error.code === "auth/email-already-in-use") {
            newState.emailInUseError = true;
          } else {
            newState.emailInUseError = false;
          }
          if (error.code === "auth/weak-password") {
            newState.weakPasswordError = true;
          } else {
            newState.weakPasswordError = false;
          }
          this.setState(newState);
        }.bind(this)
      );
  };

  render() {
    return (
      <div>
        <h2>Register</h2>
        <p className="text-danger">{this.errorMessage}</p>
        <form onSubmit={this.register}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              className="form-control"
              type="text"
              ref={this.firstNameRef}
              name="firstName"
              placeholder="First Name"
            />
            {this.state.firstNameError && (
              <small className="text-danger">First name is required</small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              className="form-control"
              type="text"
              ref={this.lastNameRef}
              name="lastName"
              placeholder="Last Name"
            />
            {this.state.lastNameError && (
              <small className="text-danger">Last name is required</small>
            )}
          </div>
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
              <small className="text-danger">Email format is invalid</small>
            )}
            {this.state.emailInUseError && (
              <small className="text-danger">Email is already in use</small>
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
            {this.state.weakPasswordError && (
              <small className="text-danger">
                Password must be at least 6 characters
              </small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="form-control"
              type="password"
              ref={this.confirmPasswordRef}
              name="confirmPassword"
              placeholder="Confirm Password"
            />
            {this.state.confirmPasswordError && (
              <small className="text-danger">
                Confirm password is required
              </small>
            )}
            {this.state.passwordMatchError && (
              <small className="text-danger">Passwords do not match</small>
            )}
          </div>
          {}
          <button type="submit" className="btn btn-outline-primary">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
