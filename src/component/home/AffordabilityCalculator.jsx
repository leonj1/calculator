import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import NumericInput from 'react-numeric-input';
import PropTypes from 'prop-types';
import Range from "../Range";

class AffordabilityCalculator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mortgage: 0,
      interest_rate: 0,
      taxes: 0,
      net_income: 10000,
      net_expenses: 2000,
      concessions: {
        include: false,
        percentage: 0.6
      },
      down_payment: 0,
      initialized: false,
      show_settings: true,
      affordability_value: 0,
    };
    // TODO toggle input of down payment percentage of mortgage vs dollar amount
    this.showSettings = this.showSettings.bind(this);
    this.mortgageChangeHandler = this.mortgageChangeHandler.bind(this);
  }

  mortgageChangeHandler = function(prop, val) {
    this.setState({ [prop]: val });
    this.calculateAffordability();
  };

  showSettings = function () {
    this.props.showSettingsHandler();
  };

  renderBanner = function () {
    if (this.props.first_time) {
      return (
        <div>
          <p>Here is where you set the max and min values that are going to be used to help you quickly determine if you
            can afford that home with that mortgage.</p>
        </div>
      )
    }
  };

  calculateAffordability = function () {
    let _affordability_value = 0;
    let monthly_mortgage_payment; //monthly mortgage payment
    let P = this.state.mortgage; //principle / initial amount borrowed
    let I = this.state.interest_rate / 100 / 12; //monthly interest rate
    // TODO input number of years of mortgage
    let N = 30 * 12; //number of payments months
    monthly_mortgage_payment = this.monthlyPayment(P, N, I);
    let monthly_taxes = this.state.taxes / 12;
    let total_expenses = this.state.net_expenses + monthly_mortgage_payment + monthly_taxes;
    _affordability_value = this.state.net_income - total_expenses;
    _affordability_value = Number(_affordability_value).toFixed(2);
    // console.log("Income: " + this.state.net_income);
    // console.log("Monthly Taxes: " + monthly_taxes + " Net Expenses: " + this.state.net_expenses + " Mortgage: " + monthly_mortgage_payment);
    this.setState({affordability_value: _affordability_value});
  };

  monthlyPayment = function (p, n, i) {
    return p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
  };

  componentWillMount() {
    let _mortgage = (this.props.ranges.mortgage.max + this.props.ranges.mortgage.min) / 2;
    let _interest_rate = (this.props.ranges.interest_rate.max + this.props.ranges.interest_rate.min) / 2;
    let _taxes = (this.props.ranges.taxes.max + this.props.ranges.taxes.min) / 2;
    this.setState({
      mortgage: _mortgage,
      interest_rate: _interest_rate,
      taxes: _taxes,
    });
  }

  componentDidMount() {
    this.calculateAffordability();
  };

  render() {
    return (
      <div className="affordability-calculator">
        <Button onClick={this.showSettings}>Settings</Button>
        {this.renderBanner}
        <div>
          <div className="sliders">
            <Typography id="label">Mortgage</Typography>
            <Range value={this.state.mortgage}
                   min={this.props.ranges.mortgage.min}
                   max={this.props.ranges.mortgage.max}
                   step="1"
                   updateRange={(e) => this.mortgageChangeHandler("mortgage", e)}/>
          </div>
          <div className="sliders">
            <Typography id="label">Taxes</Typography>
            <Range value={this.state.taxes}
                   min={this.props.ranges.taxes.min}
                   max={this.props.ranges.taxes.max}
                   step="1"
                   updateRange={(e) => this.mortgageChangeHandler("taxes", e)}/>
          </div>
          <div className="sliders">
            <Typography id="label">Interest Rate</Typography>
            <Range value={this.state.interest_rate}
                   min={this.props.ranges.interest_rate.min}
                   max={this.props.ranges.interest_rate.max}
                   step="0.01"
                   updateRange={(e) => this.mortgageChangeHandler("interest_rate", e)}/>
          </div>
          <div>
            <Typography id="label">Net Monthly Income</Typography>
            <NumericInput className="form-control"
                          style={ false }
                          placeholder="Net Monthly Income"
                          onChange={(e) => this.mortgageChangeHandler("net_income", e)}
                          value={this.state.net_income}/>
          </div>
          <div>
            <Typography id="label">Net Monthly Expenses</Typography>
            <NumericInput className="form-control"
                          style={ false }
                          placeholder="Net Monthly Expenses"
                          onChange={(e) => this.mortgageChangeHandler("net_expenses", e)}
                          value={this.state.net_expenses}/>
          </div>
          <div>
            <Typography id="label">Affordability</Typography>
            <NumericInput className="form-control"
                          style={ false }
                          placeholder="Affordability"
                          value={this.state.affordability_value}/>
          </div>
        </div>
      </div>
    )
  }
}

AffordabilityCalculator.PropTypes = {
  first_time: PropTypes.bool.isRequired,
  net_income: PropTypes.number.isRequired,
  net_expenses: PropTypes.number.isRequired,
  down_payment: PropTypes.number.isRequired,
  showSettingsHandler: PropTypes.func.isRequired,
  ranges: PropTypes.shape({
    mortgage: PropTypes.shape({
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
    }),
    taxes: PropTypes.shape({
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
    }),
    interest_rate: PropTypes.shape({
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
    }),
  }).isRequired,
  concessions: PropTypes.shape({
    include: PropTypes.bool.isRequired,
    percentage: PropTypes.number.isRequired,
  })
};

export default AffordabilityCalculator;
