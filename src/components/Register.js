import React from "react";
import { firebaseApp } from "../firebase";

class Register extends React.Component {
  firstNameRef = React.createRef();
  lastNameRef = React.createRef();
  emailRef = React.createRef();
  passwordRef = React.createRef();
  confirmPasswordRef = React.createRef();

  errorMessage = null;

  register = event => {
    event.preventDefault();
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(
        this.emailRef.current.value,
        this.passwordRef.current.value
      )
      .catch(function(error) {
        this.errorMessage = error.message;
        this.props.history.push("/");
      });
    // firebaseApp
    //   .ref("users/" + firebaseApp.auth().currentUser.uid)
    //   .set({
    //     firstName: this.firstNameRef,
    //     lastName: this.lastNameRef
    //   });
    this.props.signIn(firebaseApp.auth().currentUser.uid);
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
