import React from 'react';
import Header from './Header';
import GoogleLogin from 'react-google-login';

class LandingPage extends React.Component {

  responseGoogle = res => {
    console.log(res);
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <h2>Welcome, Login or Signup</h2>
          <GoogleLogin
            clientId=""
            buttonText="Login with Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
    );
  }
}

export default LandingPage;