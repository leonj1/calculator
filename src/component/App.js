import React, { Component } from "react";
import "./App.css";

import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { submitSecret, fetchSecret, clearPastRequest } from '../redux/actions';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import BasicCalculator from './BasicCalculator';

class App extends Component {
  constructor(props) {
    super(props);
    // TODO track room occupancy at state here?
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/" className="App-logo">VariousCalculators</Link>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <NavItem eventKey={1} href="/home">
                <Link to="home" className="NavBar-Item">Home Affordability</Link>
              </NavItem>
              <NavItem eventKey={2} href="/car/">
                <Link to="car" className="NavBar-Item">Car Loan</Link>
              </NavItem>
              <NavItem eventKey={2} href="/calculator/">
                <Link to="calculator" className="NavBar-Item">Basic Calculator</Link>
              </NavItem>
            </Nav>
          </Navbar>

          <Route exact path="/" render={(props) => ( <div>main</div> )}/>
          <Route path="/home/" render={(props) => (<div>home</div> )}/>
          <Route path="/car/" render={(props) => (<div>car</div> )}/>
          <Route path="/calculator/" render={(props) => (<BasicCalculator/>)}/>
        </div>
      </Router>
    );
  }
}


const mapStateToProps = state => {
  return {
    secret: state.secret,
    token: state.token,
    request: state.request
  }
};

const mapDispatchToProps = dispatch => {
  return {
    createSecretProp: function(secret) {
      dispatch(submitSecret(secret));
    },
    fetchSecretProp: function(token) {
      dispatch(fetchSecret(token));
    },
    clearPastRequest: function() {
      dispatch(clearPastRequest());
    }
  }
};

const ReduxApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ReduxApp;
