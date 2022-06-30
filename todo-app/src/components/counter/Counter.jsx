import React, { Component } from "react";
import PropTypes from 'prop-types';
import './counter.css';

//Function component
class Counter extends Component {
    
    //Define the initial state in a constructor
    //state => counter 0
    constructor(){
        super(); //Error 1

        this.state = {
            counter : 0,
        }

        // this.increment = this.increment.bind(this);
    }

    render = () => {
        return(
        <div className='counter'>
            <button onClick={this.increment}>+{this.props.by}</button>
            <span className="count" >{this.state.counter}</span>
        </div>
        );
    }

    increment = () =>{ //Update state
        // console.log('increment')
        this.setState({
            counter: this.state.counter + this.props.by,
        }

        );
      }
    
}

Counter.defaultProps = {
    by : 1,
}

Counter.propTypes = {
    by : PropTypes.number,
}

  export default Counter;