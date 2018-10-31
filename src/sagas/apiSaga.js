import {all, call, put, takeLatest, select} from 'redux-saga/effects'
import axios from 'axios';
import {
  CHECK_ROOM_EXISTS,
  FETCH_LATEST_MESSAGE_FAILED,
  FETCH_LATEST_MESSAGE_REQUEST,
  FETCH_LATEST_MESSAGE_SUCCESS,
  FETCH_MESSAGES_SINCE_FAILED,
  FETCH_MESSAGES_SINCE_REQUEST,
  FETCH_MESSAGES_SINCE_SUCCESS,
  FETCH_USER_STATUS_FAILURE,
  FETCH_USER_STATUS_REQUEST,
  FETCH_USER_STATUS_SUCCESS,
  IDLE_TIMEOUT,
  IDLE_TIMEOUT_FAILURE,
  IDLE_TIMEOUT_SUCCESS,
  LOGOUT_REQUEST,
  NICK_NAME_FAILED,
  NICK_NAME_REQUEST,
  NICK_NAME_SUCCESS,
  ROOM_DOES_NOT_EXIST,
  ROOM_EXISTS, SEND_MESSAGE_FAILED, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS
} from "../redux/actions";

const backend = "http://localhost:6767";

export const getRoom = (state) => state.room;
export const getUser = (state) => state.user;
export const getOtherUser = (state) => state.otherUser;
export const getMessages = (state) => state.messages;

function* loginUser(action) {
  try {
    const contents = yield call(axios.post, backend + "/login/", action.payload);
    let _loggedIn = contents.status === 200;
    let _token = contents.status === 200 ? contents.statusText : '';
    let _actionType = contents.status === 200 ? NICK_NAME_SUCCESS : NICK_NAME_FAILED;
    yield put({
      type: _actionType,
      user: {
        loggedIn: _loggedIn,
        token: _token,
        name: action.payload,
        request: {
          status: contents.status,
          text: contents.statusText,
        }
      }
    })
  } catch (e) {
    yield put({
      type: NICK_NAME_FAILED,
      user: {
        loggedIn: false,
        token: '',
        name: action.payload,
        request: {
          status: e.response.status,
          text: e.response.data,
        }
      }
    })
  }
}

function* logoutUser() {
  try {
    let user = yield select(getUser);
    const contents = yield call(axios.post, backend + "/logout/", user.name);
    yield put({
      type: LOGOUT_REQUEST,
      user: {
        loggedIn: false,
        name: '',
        token: '',
        request: {
          status: contents.status,
          text: contents.statusText,
        }
      }
    })
  } catch (e) {
    console.log("Failed to logout: " + e.contents.status + " " + e.contents.data);
  }
}

function* checkRoomExists(action) {
  try {
    const contents = yield call(axios.get, backend + "/room/" + action.payload);
    let _exists = false;
    if (contents.status === 200) {
      _exists = true;
    }
    yield put({
      type: ROOM_EXISTS,
      room: {
        exists: _exists,
        roomId: action.payload,
        status: contents.status,
        text: contents.statusText,
      }
    })
  } catch (e) {
    yield put({
      type: ROOM_DOES_NOT_EXIST,
      room: {
        exists: false,
        roomId: 0,
        status: e.response.status,
        text: e.response.data,
      }
    })
  }
}

function* fetchUnreadMessages(action) {
  try {
    const contents = yield call(axios.post, backend + "/messages/" + action.payload);
    let _messages = contents.status === 200 ? contents.statusText : '';
    let _actionType = contents.status === 200 ? FETCH_LATEST_MESSAGE_SUCCESS : FETCH_LATEST_MESSAGE_FAILED;
    yield put({
      type: _actionType,
      messages: {
        list: _messages,
        request: {
          status: contents.status,
          text: ''
        }
      }
    })
  } catch (e) {
    let _messages = yield select(getMessages);
    yield put({
      type: FETCH_LATEST_MESSAGE_FAILED,
      messages: {
        list: _messages.list,
        request: {
          status: e.response.status,
          text: e.response.data
        }
      }
    })
  }
}

function* fetchMessagesSince(action) {
  try {
    const contents = yield call(axios.post, backend + "/messages/" + action.payload.roomId + "/" + action.payload.messageId);
    let _messages = contents.status === 200 ? contents.statusText : '';
    let _actionType = contents.status === 200 ? FETCH_MESSAGES_SINCE_SUCCESS : FETCH_MESSAGES_SINCE_FAILED;
    // TODO append unique messages, prevent duplicates
    yield put({
      type: _actionType,
      messages: {
        list: _messages,
        request: {
          status: contents.status,
          text: ''
        }
      }
    })
  } catch (e) {
    yield put({
      type: NICK_NAME_FAILED,
      user: {
        loggedIn: false,
        token: '',
        request: {
          status: e.response.status,
          text: e.response.data,
        }
      }
    })
  }
}

function* userTimedOut() {
  try {
    let _room = yield select(getRoom);
    let _user = yield select(getUser);
    const contents = yield call(axios.post, backend + "/user/" + _room.roomId + "/" + _user.name);
    let _actionType = contents.status === 200 ? IDLE_TIMEOUT_SUCCESS : IDLE_TIMEOUT_FAILURE;
    yield put({
      type: _actionType,
      user: {
        loggedIn: false,
        name: '',
        token: '',
        request: {
          status: contents.status,
          text: contents.statusText
        }
      },
    })
  } catch (e) {
    yield put({
      type: NICK_NAME_FAILED,
      user: {
        loggedIn: false,
        token: '',
        request: {
          status: e.response.status,
          text: e.response.data,
        }
      }
    })
  }
}

function* fetchUserStatusRequest() {
  try {
    let user = yield select(getUser);
    let room = yield select(getRoom);

    const contents = yield call(axios.get, backend + "/online/status/" + room.roomId + "/" + user.name);
    let _actionType = contents.status === 200 ? FETCH_USER_STATUS_SUCCESS : FETCH_USER_STATUS_FAILURE;
    yield put({
      type: _actionType,
      otherUser: {
        status: contents.statusText,
        request: {
          status: contents.status,
          text: ''
        }
      },
    })
  } catch (e) {
    yield put({
      type: FETCH_USER_STATUS_FAILURE,
      otherUser: {
        status: "unknown",
        request: {
          status: e.response.status,
          text: e.response.data
        }
      },
    })
  }
}

function* sendMessage(message) {
  try {
    let _room = yield select(getRoom);
    let _user = yield select(getUser);
    let _otherUser = yield select(getOtherUser);
    let _messages = yield select(getMessages);
    let payload = {
      from: _user.name,
      to: _otherUser.name,
      message: message,
      room_id: _room.roomId
    };
    const contents = yield call(axios.post, backend + "/message", payload);
    let _actionType = contents.status === 200 ? SEND_MESSAGE_SUCCESS : SEND_MESSAGE_FAILED;
    let _m = _messages.push(message);
    yield put({
      type: _actionType,
      messages: {
        list: _m,
        request: {
          status: 200,
          text: ''
        }
      }
    })
  } catch (e) {
    yield put({
      type: NICK_NAME_FAILED,
      user: {
        loggedIn: false,
        token: '',
        request: {
          status: e.response.status,
          text: e.response.data,
        }
      }
    })
  }
}

// function foo(verb, url, targetObject, onSuccess, onFailure, failurePayload) {
//   try {
//     const contents = yield call(axios[verb], url);
//     let _result = contents.status === 200 ? contents.statusText : '';
//     let _actionType = contents.status === 200 ? onSuccess : onFailure;
//     yield put({
//       type: _actionType,
//       [targetObject]: {
//         data: _result,
//         request: {
//           status: contents.status,
//           text: ''
//         }
//       }
//     })
//   } catch (e) {
//     yield put({
//       type: onFailure,
//       [targetObject]: failurePayload
//     })
//   }
// }

const checkRoomExistsSaga = takeLatest(CHECK_ROOM_EXISTS, checkRoomExists);
const loginUserSaga = takeLatest(NICK_NAME_REQUEST, loginUser);
const logoutUserSaga = takeLatest(LOGOUT_REQUEST, logoutUser);
const fetchMessagesSaga = takeLatest(FETCH_LATEST_MESSAGE_REQUEST, fetchUnreadMessages);
const fetchMessagesSinceSaga = takeLatest(FETCH_MESSAGES_SINCE_REQUEST, fetchMessagesSince);
const userLoggedOutSaga = takeLatest(LOGOUT_REQUEST, logoutUser);
const userTimedOutSaga = takeLatest(IDLE_TIMEOUT, userTimedOut);
const fetchUserStatusSaga = takeLatest(FETCH_USER_STATUS_REQUEST, fetchUserStatusRequest);
const sendMessageSaga = takeLatest(SEND_MESSAGE_REQUEST, sendMessage);

function* rootSaga() {
  yield all([
    checkRoomExistsSaga,
    loginUserSaga,
    logoutUserSaga,
    userLoggedOutSaga,
    userTimedOutSaga,
    fetchMessagesSaga,
    fetchMessagesSinceSaga,
    fetchUserStatusSaga,
    sendMessageSaga,
  ])
}

export default rootSaga;
