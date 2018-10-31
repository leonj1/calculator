export const SET_MORTGAGE_MIN = 'SET_MORTGAGE_MIN';
export const SET_MORTGAGE_MAX = 'SET_MORTGAGE_MAX';
export const SET_MORTGAGE = 'SET_MORTGAGE';
export const SET_TAXES_MIN = 'SET_TAXES_MIN';
export const SET_TAXES_MAX = 'SET_TAXES_MAX';
export const SET_TAXES = 'SET_TAXES';
export const SET_INTEREST_RATE_MIN = 'SET_INTEREST_RATE_MIN';
export const SET_INTEREST_RATE_MAX = 'SET_INTEREST_RATE_MAX';
export const SET_INTEREST_RATE = 'SET_INTEREST_RATE';

export const RAISE_TOAST = 'RAISE_TOAST';
export const CLOSE_TOAST = 'CLOSE_TOAST';

export const CHECK_ROOM_EXISTS = 'CHECK_ROOM_EXISTS';
export const ROOM_DOES_NOT_EXIST = 'ROOM_DOES_NOT_EXIST';
export const ROOM_EXISTS = 'ROOM_EXISTS';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

export const IDLE_TIMEOUT = 'IDLE_TIMEOUT';
export const IDLE_TIMEOUT_SUCCESS = 'IDLE_TIMEOUT_SUCCESS';
export const IDLE_TIMEOUT_FAILURE = 'IDLE_TIMEOUT_FAILURE';

export const NICK_NAME_REQUEST = 'NICK_NAME_REQUEST';
export const NICK_NAME_SUCCESS = 'NICK_NAME_SUCCESS';
export const NICK_NAME_FAILED = 'NICK_NAME_FAILED';

export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED';

export const FETCH_LATEST_MESSAGE_REQUEST = 'FETCH_LATEST_MESSAGE_REQUEST';
export const FETCH_LATEST_MESSAGE_FAILED = 'FETCH_LATEST_MESSAGE_FAILED';
export const FETCH_LATEST_MESSAGE_SUCCESS = 'FETCH_LATEST_MESSAGE_SUCCESS';

export const FETCH_MESSAGES_SINCE_REQUEST = 'FETCH_MESSAGES_SINCE_REQUEST';
export const FETCH_MESSAGES_SINCE_FAILED = 'FETCH_MESSAGES_SINCE_FAILED';
export const FETCH_MESSAGES_SINCE_SUCCESS = 'FETCH_MESSAGES_SINCE_SUCCESS';

export const FETCH_USER_STATUS_REQUEST = 'FETCH_USER_STATUS_REQUEST';
export const FETCH_USER_STATUS_SUCCESS = 'FETCH_USER_STATUS_SUCCESS';
export const FETCH_USER_STATUS_FAILURE = 'FETCH_USER_STATUS_FAILURE';

/**
 * Home affordability functions
 */
export function setValue(type, parent, val) {
	return {
		type: [type],
		payload: {
			val: val,
			parent: parent,
		}
	}
}

/**
 * Room Redux Actions
 */
export function fetchUserStatusRequest() {
  return {
    type: FETCH_USER_STATUS_REQUEST
  }
}

export function nickNameRequest(name) {
  return {
    type: NICK_NAME_REQUEST,
    payload: name
  }
}

export function checkRoomExists(roomId) {
  return {
    type: CHECK_ROOM_EXISTS,
    payload: roomId
  }
}

export function loginRequest(user) {
  return {
    type: NICK_NAME_REQUEST,
    payload: user
  }
}

export function userLoggedOut() {
  return {
    type: LOGOUT_REQUEST,
  }
}

export function userTimedOut() {
  return {
    type: IDLE_TIMEOUT,
  }
}

export function sendMessageRequest(message) {
  return {
    type: SEND_MESSAGE_REQUEST,
    payload: message
  }
}

export function fetchLatestMessages(roomId) {
  return {
    type: FETCH_LATEST_MESSAGE_REQUEST,
    payload: roomId
  }
}

export function fetchMessagesSince(roomId, messageId) {
  return {
    type: FETCH_MESSAGES_SINCE_REQUEST,
    payload: {
      roomId: roomId,
      messageId: messageId
    }
  }
}

/**
 * Site wide Utility functions
 */
export function raiseToast(contents, duration, color) {
  return {
    type: RAISE_TOAST,
    toast: {
      show: true,
      contents: contents,
      duration: duration,
      color: color
    }
  }
}

export function closeToast() {
  return {
    type: CLOSE_TOAST,
    toast: {
      show: false,
      contents: '',
      duration: 0,
      color: "black"
    }
  }
}