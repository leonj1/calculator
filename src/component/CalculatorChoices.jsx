import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CalculatorChoices extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <div>Home Affordability</div>
        <div>Car Loan Calculator</div>
        <div>Basic Calculator</div>
      </div>
    );
  }
}

export default CalculatorChoices;
