import React, { Component } from "react";
import {
    Link,
  } from "react-router-dom";
  import AuthenticationService from "./AuthenticationService.js";


class HeaderComponent extends Component {
    render() {
      const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
  
      return (
        <header>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div>
              <a href="https://hobbyhoppr.com/" className="navbar-nav">
                in28Minutes
              </a>
            </div>
            <ul className="navbar-nav">
              {isUserLoggedIn && (
                <li className="nav-link">
                  <Link to="/welcome/username">Home</Link>
                </li>
              )}
              {isUserLoggedIn && (
                <li className="nav-link">
                  <Link to="/todos">Todo</Link>
                </li>
              )}
            </ul>
            <ul className="navbar-nav navbar-collapse justify-content-end">
              {!isUserLoggedIn && (
                <li className="nav-link">
                  <Link to="/login">Login</Link>
                </li>
              )}
              {isUserLoggedIn && (
                <li className="nav-link">
                  <Link to="/logout" onClick={AuthenticationService.logout}>
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </header>
      );
    }
  }

  export default HeaderComponent;