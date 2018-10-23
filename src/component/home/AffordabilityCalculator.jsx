import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import ToggleSwitch from "../ToggleSwitch";
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
      net_income: 0,
      net_expenses: 0,
      concessions: {
        include: false,
        percentage: 0.6
      },
      down_payment: 0,
      initialized: false,
      show_settings: true,
    };
    this.showSettings = this.showSettings.bind(this);
    this.mortgageChangeHandler = this.mortgageChangeHandler.bind(this);
  }

  mortgageChangeHandler = function(prop, val) {
    this.setState({ [prop]: val })
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

  componentDidMount() {
    let _mortgage = (this.props.ranges.mortgage.max + this.props.ranges.mortgage.min) / 2;
    let _interest_rate = (this.props.ranges.interest_rate.max + this.props.ranges.interest_rate.min) / 2;
    let _taxes = (this.props.ranges.taxes.max + this.props.ranges.taxes.min) / 2;
    console.log("Min: " + this.props.ranges.mortgage.min);
    console.log("Max: " + this.props.ranges.mortgage.max);
    console.log("Mort: " + _mortgage);
    this.setState({
      mortgage: _mortgage,
      interest_rate: _interest_rate,
      taxes: _taxes,
    })
  }

  render() {
    return (
      <div>
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
