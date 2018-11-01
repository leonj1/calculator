import React, {Component} from 'react';
import Display from "./Display";
import ButtonPanel from "./ButtonPanel";
import calculate from "../logic/calculate";
import "./App.css";
import IdleTimer from 'react-idle-timer'
import Room from "./room/Room";
import {connect} from 'react-redux';
import {
  checkRoomExists,
  userTimedOut,
} from '../redux/actions';
import {bindActionCreators} from 'redux';

class BasicCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: null,
      next: null,
      operation: null,
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

  handleCalculatorButtonClick = buttonName => {
    let _nextState = calculate(this.state, buttonName, this.props.checkRoomExists);
    this.setState(_nextState);
  };

  render() {
    console.log("Room exists val: " + this.props.room.exists);
    return (
      <div className="component-app">
        {this.props.room.exists ? (
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
            <ButtonPanel clickHandler={this.handleCalculatorButtonClick} />
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
    // TODO tell them we have timed out
    this.props.userTimedOut();
    this.setState({next: 0, isIdle: true, timeRemaining: this.idleTimer.getRemainingTime()});
  }
}

function mapStateToProps(state) {
  return {
    room: state.room,
  }
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({
    checkRoomExists: checkRoomExists,
    userTimedOut: userTimedOut,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicCalculator);

