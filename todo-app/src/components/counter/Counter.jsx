import React, { Component } from "react";
import PropTypes from "prop-types";
import "./counter.css";

//Counter
class Counter extends Component {
  constructor() {
    super(); //Error 1

    this.state = {
      counter: 0,
    };

    // this.increment = this.increment.bind(this);
  }

  render() {
    return (
      <div className="counter">
          <CounterButton
            by={1}
            incrementMethod={this.increment}
            decrementMethod={this.decrement}
          />
          <CounterButton
            by={5}
            incrementMethod={this.increment}
            decrementMethod={this.decrement}
          />
          <CounterButton
            by={10}
            incrementMethod={this.increment}
            decrementMethod={this.decrement}
          />
        <span className="count">{this.state.counter}</span>
        <ResetButton resetMethod={this.reset} />
      </div>
    );
  }

  increment = (by) => {
    //Update state
    // console.log(`increment from child - ${by}`)
    this.setState((previousState) => {
      return { counter: previousState.counter + by };
    });
  };

  decrement = (by) => {
    //Decrement state
    this.setState((previousState) => {
      return { counter: previousState.counter - by };
    });
  };

  reset = () => {
    this.setState(() => {
      return { counter: 0 };
    });
  };
}

//Function component increment button
class CounterButton extends Component {
  //Define the initial state in a constructor
  //state => counter 0
  constructor() {
    super(); //Error 1

//     this.state = {
//       counter: 0,
//     };

//     // this.increment = this.increment.bind(this);
  }

  render = () => {
    return (
      <div className="counter">
        <button onClick={() => this.props.incrementMethod(this.props.by)}>
          +{this.props.by}
        </button>
        <button onClick={() => this.props.decrementMethod(this.props.by)}>
          -{this.props.by}
        </button>
        {/* <span className="count" >{this.state.counter}</span> */}
      </div>
    );
  };

  increment = () => {
    //Update state
    this.setState((previousState) => {
      return { counter: previousState.counter + this.props.by };
    });
    this.props.incrementMethod(this.props.by);
  };

  decrement = () => {
    //Update state decrease
    console.log("decrement");
    this.setState((previousState) => {
      return { counter: previousState.counter - this.props.by };
    });
    this.props.decrementMethod(this.props.by);
  };

  reset = () => {
    //reset state to zero
    this.setState(() => {
      return { counter: 0 };
    });
    this.props.resetMethod();
  };
}

class ResetButton extends Component {
  constructor() {
    super();    
  }
  render = () => {
    return (
      <div className="counter">
        <button className="reset" onClick={this.reset}>
          Reset
        </button>
        {/* <span className="count" >{this.state.counter}</span> */}
      </div>
    );
  };

  reset = () => {
    this.setState(() => {
      return { counter: 0 };
    });
    this.props.resetMethod();
  };
}

CounterButton.defaultProps = {
  by: 1,
};

CounterButton.propTypes = {
  by: PropTypes.number,
};

export default Counter;
