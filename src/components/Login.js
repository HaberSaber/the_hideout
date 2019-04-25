import React from "react";
import { firebaseApp } from "../firebase";

class Login extends React.Component {
  emailRef = React.createRef();
  passwordRef = React.createRef();
  errorMessage = null;

  login = event => {
    event.preventDefault();
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(
        this.emailRef.current.value,
        this.passwordRef.current.value
      )
      .catch(function(error) {
        this.errorMessage = error.message;
        return
      });
      this.props.signIn(firebaseApp.auth().currentUser.uid)
  };

  render() {
    return (
      <div>
        <h2>Login</h2>
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
          <button type="submit" className="btn btn-outline-success">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
