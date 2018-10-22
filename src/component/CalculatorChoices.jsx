import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CalculatorChoices extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Link to="home" className="NavBar-Item">Home Affordability</Link>
        <Link to="car" className="NavBar-Item">Car Loan</Link>
        <Link to="calculator" className="NavBar-Item">Basic Calculator</Link>
      </div>
    );
  }
}

export default CalculatorChoices;
