import React, { Component } from "react";
import {Link} from "react-router-dom";

class LogoutComponent extends Component {
    render() {
      return (
        <div>
          <h1>You are logged out</h1>
          <div>
            <Link to="/login">Login</Link>
          </div>
        </div>
      );
    }
  }

  export default LogoutComponent;