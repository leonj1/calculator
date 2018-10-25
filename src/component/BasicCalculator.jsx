import React, { Component } from 'react';
import Display from "./Display";
import ButtonPanel from "./ButtonPanel";
import calculate from "../logic/calculate";
import "./App.css";
import IdleTimer from 'react-idle-timer'
import Room from "./room/Room";

class BasicCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: null,
      next: null,
      operation: null,
      openRoom: false,
      timeoutSeconds: 60,
      isIdle: false,
      timeRemaining: 0,
    };
    this.idleTimer = null;
    this.onActive = this._onActive.bind(this);
    this.onIdle = this._onIdle.bind(this);

    // TODO Banner to show count down remaining time?
    // getRemainingTime() {Number} - Returns the remaining time in milliseconds
    // src: https://www.npmjs.com/package/react-idle-timer
  }

  handleClick = buttonName => {
    this.setState(calculate(this.state, buttonName));
  };

  render() {
    return (
      <div className="component-app">
        {this.state.openRoom ? (
          <IdleTimer
            ref={ref => { this.idleTimer = ref }}
            element={document}
            onActive={this.onActive}
            onIdle={this.onIdle}
            timeout={1000 * this.state.timeoutSeconds}>
            <Room isIdle={this.state.isIdle}
                  timeRemaining={this.state.timeRemaining}/>
          </IdleTimer>

        ) : (
          <div className="basic-calculator">
            <Display value={this.state.next || this.state.total || "0"} />
            <ButtonPanel clickHandler={this.handleClick} />
          </div>
        )}
      </div>
    );
  }

  _onActive(e) {
    console.log('user is active', e);
    console.log('time remaining', this.idleTimer.getRemainingTime());
    this.setState({isIdle: false, timeRemaining: this.idleTimer.getRemainingTime()});
  }

  _onIdle(e) {
    console.log('user is idle', e);
    console.log('last active', this.idleTimer.getLastActiveTime());
    this.setState({openRoom: false, next: 0, isIdle: true, timeRemaining: this.idleTimer.getRemainingTime()});
  }

};

export default BasicCalculator;
