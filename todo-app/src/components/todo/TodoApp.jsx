import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
  Link,
} from "react-router-dom";
import withNavigation from "./withNavigation";
import AuthenticationService from "./AuthenticationService.js";
import AuthenticatedRoute from "./AuthenticateRoute";

class TodoApp extends Component {
  render() {
    const LoginComponentWithNavigation = withNavigation(LoginComponent);

    // const WelcomeComponentWithParams = withParams(WelcomeComponent);

    const HeaderComponentWithNavigation = withNavigation(HeaderComponent);

    return (
      <div className="TodoApp">
        <Router>
          <HeaderComponentWithNavigation />
          <Routes>
            <Route path="/" element={<LoginComponentWithNavigation />} />
            <Route path="/login" element={<LoginComponentWithNavigation />} />
            <Route path="/welcome/:name" element={
              <AuthenticatedRoute>
                <WelcomeComponent />
              </AuthenticatedRoute>
            } />
            <Route path="/todos" element={              <AuthenticatedRoute>
                <ListTodosComponent />
              </AuthenticatedRoute>} />
            <Route path="/logout" element={<AuthenticatedRoute><LogoutComponent /></AuthenticatedRoute>} />
            <Route path="*" element={<ErrorComponent />} />
          </Routes>
          <FooterComponent />
        </Router>

        {/* <LoginComponent />
        <WelcomeComponent /> */}
      </div>
    );
  }
}

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

class FooterComponent extends Component {
  render() {
    return (
      <footer className="footer">
        <span className="text-muted">HobbyHopper</span>
      </footer>
    );
  }
}

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

class ListTodosComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          description: "Learn React",
          done: false,
          targetDate: new Date(),
        },
        {
          id: 2,
          description: "Become an expert programmer",
          done: false,
          targetDate: new Date(),
        },
        {
          id: 3,
          description: "Visit India",
          done: false,
          targetDate: new Date(),
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <h1>List Todos</h1>

        <div className="container">
          <table className="table">
            <thead>
              <tr>
                {/* <th>id</th> */}
                <th>description</th>
                <th>targetDate</th>
                <th>is Completed?</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map((todo) => (
                <tr>
                  {/* <td>{todo.id}</td> */}
                  <td>{todo.description}</td>
                  <td>{todo.done.toString()}</td>
                  <td>{todo.targetDate.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

function WelcomeComponent(props) {
  let { name: username } = useParams();
  return (
    <div>
      <p>
        Welcome {username}. You can manage your todos{" "}
        <Link to="/todos">here</Link>
      </p>
    </div>
  );
}

function ErrorComponent() {
  return <div>404 Page not found.</div>;
}

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

export default TodoApp;
