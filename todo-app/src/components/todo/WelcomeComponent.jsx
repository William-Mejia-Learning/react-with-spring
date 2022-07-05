import React, { Component } from "react";
import {
    useParams,
    params,
    Link,
  } from "react-router-dom";
import HelloWorldService from "../../api/todo/HelloWorldService";


class WelcomeComponent extends Component {
    constructor(props) {
      super(props)
      this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
      this.state = {
        welcomeMessage : ''
      }
      this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
    }
    render() {
      // let { name: username } = useParams();
      return (
        <div>
          <div className="container">
            Welcome. You can manage your todos{" "}
            <Link to="/todos">here</Link>
          </div>
          <div className="container">
            Welcome. You can manage your todos{" "}
            <Link to="/todos">here</Link>
            <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">
              Get Welcome Message
            </button>
          </div>
          <div className="container">
            {this.state.welcomeMessage}
          </div>
        </div>
      );
    }
    retrieveWelcomeMessage(){
      // HelloWorldService.executeHelloWorldService().then(response => this.handleSuccessfulResponse(response))
  
      HelloWorldService.executeHelloWorldBean().then(response => this.handleSuccessfulResponse(response))
  
      // HelloWorldService.executeHelloWorldPathVariable().then(response => this.handleSuccessfulResponse(response))
    }
  
    handleSuccessfulResponse(response){
      this.setState({
      welcomeMessage: response.data.message
      })
  
    }
  }

  export default WelcomeComponent;