import React, { Component } from 'react';
import ToggleSwitch from "../ToggleSwitch";
import { Button } from 'react-bootstrap';
import NumericInput from 'react-numeric-input';
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
    };
    this.doneHandler = this.doneHandler.bind(this);
    this.concessionHandler = this.concessionHandler.bind(this);
    this.doneHandler = this.doneHandler.bind(this);
    this.mortMin = this.mortMin.bind(this);
  }

  renderBanner = function() {
    if(this.props.first_time) {
      return (
        <div>
          <p>Here is where you set the max and min values that are going to be used to help you quickly determine if you can afford that home with that mortgage.</p>
        </div>
      )
    }
  };

  concessionHandler = function(value) {
    this.setState({...this.state.concessions, include: value});
  };

  doneHandler = function() {
    this.props.done(this.state.ranges, this.state.concessions);
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
      <div>
        {this.renderBanner}
        <div style={{display: "flex"}}>
          <NumericInput className="form-control" style={ false } placeholder="Mortgage Minimum" onChange={(e) => this.mortMin(e, "mortgage", "min")} value={this.state.ranges.mortgage.min}/>
          <NumericInput className="form-control" style={ false } placeholder="Mortgage Maximum" onChange={(e) => this.mortMin(e, "mortgage", "max")}  value={this.state.ranges.mortgage.max}/>
        </div>
        <div style={{display: "flex"}}>
          <NumericInput className="form-control" style={ false } placeholder="Interest Rate Minimum" onChange={(e) => this.mortMin(e, "interest_rate", "min")}  value={this.state.ranges.interest_rate.min}/>
          <NumericInput className="form-control" style={ false } placeholder="Interest Rate Maximum" onChange={(e) => this.mortMin(e, "interest_rate", "max")}  value={this.state.ranges.interest_rate.max}/>
        </div>
        <div style={{display: "flex"}}>
          <NumericInput className="form-control" style={ false } placeholder="Property Tax Minimum" onChange={(e) => this.mortMin(e, "taxes", "min")}  value={this.state.ranges.taxes.min}/>
          <NumericInput className="form-control" style={ false } placeholder="Property Tax Maximum" onChange={(e) => this.mortMin(e, "taxes", "max")}  value={this.state.ranges.taxes.max}/>
        </div>
        <div style={{display: "flex"}}>
          <ToggleSwitch change={this.concessionHandler}
                        isChecked={this.state.concessions.include}/>
          <NumericInput className="form-control" style={ false } placeholder="Concession Percentage"/>
        </div>
        <div style={{display: "flex"}}>
          <Button bsStyle="primary" onClick={this.doneHandler}>Save</Button>
          <Button onClick={this.props.cancel}>Cancel</Button>
        </div>
      </div>
    )
  }
}

export default Settings;
