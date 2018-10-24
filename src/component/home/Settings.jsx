import React, { Component } from 'react';
import ToggleSwitch from "../ToggleSwitch";
import { Button } from 'react-bootstrap';
import NumericInput from 'react-numeric-input';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ranges: {
        mortgage: {
          min: 0,
          max: 0
        },
        interest_rate: {
          min: 0,
          max: 0
        },
        taxes: {
          min: 0,
          max: 0
        }
      },
      concessions: {
        include: false,
        percentage: 0.6
      },
      pmi_percent: 1.0
    };
    this.doneHandler = this.doneHandler.bind(this);
    this.concessionHandler = this.concessionHandler.bind(this);
    this.doneHandler = this.doneHandler.bind(this);
    this.mortMin = this.mortMin.bind(this);
    this.pmiHandler = this.pmiHandler.bind(this);
  }

  renderBanner() {
    if(this.props.first_time) {
      return (
        <div>
          <p>
            Here is where you set minimum and maximum values of what price range you are looking at.
            You can always return here to change them if needed. Click save to see it in action!
          </p>
        </div>
      )
    }
  };

  pmiHandler = function(value) {
    this.setState({pmi_percent: value});
  };

  concessionHandler = function(value) {
    this.setState({...this.state.concessions, include: value});
  };

  doneHandler = function() {
    this.props.done(this.state.ranges, this.state.concessions, this.state.pmi_percent);
  };

  mortMin = function (val, parent, prop) {
    let foo = [parent] + '.' + [prop];
    let _ranges = this.state.ranges;
    _.update(_ranges, foo, function(n) { return val; });
    this.setState({ranges: _ranges});
  };

  componentWillMount() {
    this.setState({ranges: this.props.ranges, concessions: this.props.concessions});
  }

  render() {
    return (
      <div style={{padding: "10px"}} className="settings_fields_wrapper">
        {this.renderBanner()}
        <div style={{display: "flex"}} className="settings_fields">
          <div style={{display: "flex", flexDirection: "column"}}>
            <Typography id="label">Mortgage Min</Typography>
            <NumericInput className="form-control" style={ false } placeholder="Mortgage Minimum" onChange={(e) => this.mortMin(e, "mortgage", "min")} value={this.state.ranges.mortgage.min}/>
          </div>
          <div style={{display: "flex", flexDirection: "column"}} className="settings_fields">
            <Typography id="label">Mortgage Max</Typography>
            <NumericInput className="form-control" style={ false } placeholder="Mortgage Maximum" onChange={(e) => this.mortMin(e, "mortgage", "max")}  value={this.state.ranges.mortgage.max}/>
          </div>
        </div>
        <div style={{display: "flex"}} className="settings_fields">
          <div style={{display: "flex", flexDirection: "column"}} className="settings_fields">
            <Typography id="label">Interest Rate Min</Typography>
            <NumericInput className="form-control" style={ false } placeholder="Interest Rate Minimum" onChange={(e) => this.mortMin(e, "interest_rate", "min")}  value={this.state.ranges.interest_rate.min}/>
          </div>
          <div style={{display: "flex", flexDirection: "column"}} className="settings_fields">
            <Typography id="label">Interest Rate Max</Typography>
            <NumericInput className="form-control" style={ false } placeholder="Interest Rate Maximum" onChange={(e) => this.mortMin(e, "interest_rate", "max")}  value={this.state.ranges.interest_rate.max}/>
          </div>
        </div>
        <div style={{display: "flex"}} className="settings_fields">
          <div style={{display: "flex", flexDirection: "column"}} className="settings_fields">
            <Typography id="label">Taxes Min</Typography>
            <NumericInput className="form-control" style={ false } placeholder="Property Tax Minimum" onChange={(e) => this.mortMin(e, "taxes", "min")}  value={this.state.ranges.taxes.min}/>
          </div>
          <div style={{display: "flex", flexDirection: "column"}} className="settings_fields">
            <Typography id="label">Taxes Max</Typography>
            <NumericInput className="form-control" style={ false } placeholder="Property Tax Maximum" onChange={(e) => this.mortMin(e, "taxes", "max")}  value={this.state.ranges.taxes.max}/>
          </div>
        </div>
        <div style={{display: "flex"}} className="settings_fields">
          <div style={{display: "flex", flexDirection: "column"}} className="settings_fields">
            <Typography id="label">PMI Percent</Typography>
            <NumericInput className="form-control" style={ false } placeholder="Property Tax Minimum" onChange={this.pmiHandler}  value={this.state.pmi_percent}/>
          </div>
        </div>
        <div style={{display: "flex", paddingLeft: "10px"}} className="settings_concessions">
          <ToggleSwitch change={this.concessionHandler}
                        label="Are you using a seller's concession?"
                        value={this.state.concessions.percentage}
                        isChecked={this.state.concessions.include}/>
          <div style={{display: "flex", flexDirection: "column", paddingLeft: "10px"}}>
            <Typography id="label">Are you going to use a seller's concession?</Typography>
            <NumericInput className="form-control" style={ false } placeholder="Concession Percentage"/>
          </div>
        </div>
        <div style={{display: "flex"}} className="settings_buttons">
          <Button bsStyle="primary" onClick={this.doneHandler}>Save</Button>
          <Button onClick={this.props.cancel}>Cancel</Button>
        </div>
      </div>
    )
  }
}

export default Settings;
