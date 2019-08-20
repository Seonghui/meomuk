import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      provider: '',
    }
  }

  render() {
    const responseGoogle = (res) => {
      console.log(res)
      this.setState({
        id: res.googleId,
        name: res.profileObj.name,
        provider: 'google',
      })
    }

    return (
      <div className="App">
        <GoogleLogin
          clientId="731588393951-mhdqsmhsri9vl4bmlaa4dt08dcj0rs5d.apps.googleusercontent.com"
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </div>
    );
  }
}

export default Login;