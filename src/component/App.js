import React, { Component } from "react";
import { connect } from 'react-redux';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import BasicCalculator from './BasicCalculator';
import CalculatorChoices from "./CalculatorChoices";
import HomeAffordability from "./home/HomeAffordability";
import MyToast from './MyToast';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import {
  closeToast,
  setValue,
  SET_MORTGAGE_MIN,
  SET_MORTGAGE_MAX,
  SET_MORTGAGE
} from '../redux/actions';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    // TODO track room occupancy at state here?
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/" className="App-logo">VariousCalculators</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="/home">
                  <Link to="home" className="NavBar-Item">Home Affordability</Link>
                </NavItem>
                <NavItem eventKey={2} href="/calculator/">
                  <Link to="calculator" className="NavBar-Item">Basic Calculator</Link>
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          { (this.props.toast.show) ?
            <MyToast duration={this.props.toast.duration}
                     clazz={{backgroundColor: this.props.toast.color}}
                     onClose={this.props.closeToast}>
              <p>{this.props.toast.contents}</p>
            </MyToast>
            : null }
          <Route exact path="/" render={(props) => ( <CalculatorChoices/> )}/>
          <Route path="/home/" render={(props) => (<HomeAffordability/> )}/>
          <Route path="/calculator/" render={(props) => (<BasicCalculator/>)}/>

        </div>
      </Router>
    );
  }
}


const mapStateToProps = state => {
  return {
    ranges: state.ranges,
    toast: state.toast,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setMortgageMin: function(val) {
      dispatch(setValue(SET_MORTGAGE_MIN, "mortgage", val));
    },
    setMortgageMax: function(val) {
      dispatch(setValue(SET_MORTGAGE_MAX, "mortgage", val));
    },
    setMortgage: function(val) {
      dispatch(setValue(SET_MORTGAGE, "mortgage", val));
    },
    setInterestRateMin: function(val) {
      dispatch(setValue(SET_MORTGAGE_MIN, "interest_rate", val));
    },
    setInterestRateMax: function(val) {
      dispatch(setValue(SET_MORTGAGE_MAX, "interest_rate", val));
    },
    setInterestRate: function(val) {
      dispatch(setValue(SET_MORTGAGE, "interest_rate", val));
    },
    setTaxesMin: function(val) {
      dispatch(setValue(SET_MORTGAGE_MIN, "taxes", val));
    },
    setTaxesMax: function(val) {
      dispatch(setValue(SET_MORTGAGE_MAX, "taxes", val));
    },
    setTaxes: function(val) {
      dispatch(setValue(SET_MORTGAGE, "taxes", val));
    },
    closeToast: function() {
      dispatch(closeToast());
    },
  }
};

const ReduxApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ReduxApp;
