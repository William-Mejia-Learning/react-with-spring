import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService.js";
import AuthenticatedRoute from "./AuthenticateRoute";
import withNavigation from "./withNavigation";



class LoginComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: "username",
        password: "",
        hasLoginFailed: false,
        showSuccessMessage: false,
      };
      // this.handleUsernameChange = this.handleUsernameChange.bind(this);
      // this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.loginClicked = this.loginClicked.bind(this);
    }
  
    handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  
    loginClicked() {
      console.log(this.state);
      if (
        this.state.username === "username" &&
        this.state.password === "password"
      ) {
        AuthenticationService.registerSuccessfullLogin(
          this.state.username,
          this.state.password
        );
        this.props.navigate(`/welcome/${this.state.username}`);
      } else {
        console.log("failed");
        this.setState({ hasLoginFailed: true });
        this.setState({ showSuccessMessage: false });
      }
    }
  
    render() {
      return (
        <div>
          <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed} />
          <ShowValidCredentials
            showSuccessMessage={this.state.showSuccessMessage}
          />
          User Name:
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          Password:
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button onClick={this.loginClicked}>Login</button>
        </div>
      );
    }
  }

const LoginComponentWithNavigation = withNavigation(LoginComponent);


  function ShowInvalidCredentials(props) {
    if (props.hasLoginFailed) {
      return <div>Invalid Credentials</div>;
    }
    return null;
  }
  
  function ShowValidCredentials(props) {
    if (props.showSuccessMessage) {
      return <div>Login Successful</div>;
    }
    return null;
  }

  

  export default LoginComponent;