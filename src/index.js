import React from "react";
import ReactDOM from "react-dom";
import App from "./component/App";
import "./index.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {
  SET_MORTGAGE_MIN,
  SET_MORTGAGE_MAX,
  SET_MORTGAGE,
  SET_INTEREST_RATE,
  SET_INTEREST_RATE_MIN,
  SET_INTEREST_RATE_MAX,
  SET_TAXES_MIN,
  SET_TAXES_MAX,
  SET_TAXES,
  TEXT_MESSAGE,
  USER_JOINED,
  USER_LEFT
} from './redux/actions';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/apiSaga';
import _ from 'lodash';

const initialState = {
  ranges: {
    mortgage: {
      min: 100000,
      max: 300000,
      value: 200000,
    },
    interest_rate: {
      min: 2.1,
      max: 5.0,
      value: 200000,
    },
    taxes: {
      min: 4000,
      max: 20000,
      value: 200000,
    }
  },
  net_income: 0,
  net_expenses: 0,
  concessions: {
    include: false,
    percentage: 0.6
  },
  down_payment: 0,
  initialized: false,
  show_settings: true,
  messages: [],
  users: [],
};

// Actions the store should perform when an action is received
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MORTGAGE_MIN:
      let path = [action.payload.parent] + '.min';
      let _ranges = this.state.ranges;
      _.update(_ranges, path, function(n) { return action.payload.val; });
      return {
        ...state,
        ranges: _ranges,
      };
    case SET_MORTGAGE_MAX:
      path = [action.payload.parent] + '.max';
      _ranges = this.state.ranges;
      _.update(_ranges, path, function(n) { return action.payload.val; });
      return {
        ...state,
        ranges: _ranges,
      };
    case SET_MORTGAGE:
      path = [action.payload.parent] + '.value';
      _ranges = this.state.ranges;
      _.update(_ranges, path, function(n) { return action.payload.val; });
      return {
        ...state,
        ranges: _ranges,
      };
    case SET_INTEREST_RATE_MIN:
      path = [action.payload.parent] + '.min';
      _ranges = this.state.ranges;
      _.update(_ranges, path, function(n) { return action.payload.val; });
      return {
        ...state,
        ranges: _ranges,
      };
    case SET_INTEREST_RATE_MAX:
      path = [action.payload.parent] + '.max';
      _ranges = this.state.ranges;
      _.update(_ranges, path, function(n) { return action.payload.val; });
      return {
        ...state,
        ranges: _ranges,
      };
    case SET_INTEREST_RATE:
      path = [action.payload.parent] + '.value';
      _ranges = this.state.ranges;
      _.update(_ranges, path, function(n) { return action.payload.val; });
      return {
        ...state,
        ranges: _ranges,
      };
    case SET_TAXES_MIN:
      path = [action.payload.parent] + '.min';
      _ranges = this.state.ranges;
      _.update(_ranges, path, function(n) { return action.payload.val; });
      return {
        ...state,
        ranges: _ranges,
      };
    case SET_TAXES_MAX:
      path = [action.payload.parent] + '.max';
      _ranges = this.state.ranges;
      _.update(_ranges, path, function(n) { return action.payload.val; });
      return {
        ...state,
        ranges: _ranges,
      };
    case SET_TAXES:
      path = [action.payload.parent] + '.value';
      _ranges = this.state.ranges;
      _.update(_ranges, path, function(n) { return action.payload.val; });
      return {
        ...state,
        ranges: _ranges,
      };
    case TEXT_MESSAGE:
      console.log("Message in store: " + JSON.stringify(action.message));
      return {
        ...state,
        messages: [...state.messages, action.message]
      };
    case USER_JOINED:
      console.log("USER JOINED: " + JSON.stringify(action));
      let us = action.users && action.users.length > 0 ? action.users : [];
      return {
        ...state,
        users: us,
      };
    case USER_LEFT:
      console.log("USER LEFT: " + JSON.stringify(action));
      us = action.users && action.users.length > 0 ? action.users : [];
      return {
        ...state,
        users: us,
      };
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();
const middleware = [
  sagaMiddleware
];

const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
);

const store = createStore(
  myReducer,
  enhancer
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();


