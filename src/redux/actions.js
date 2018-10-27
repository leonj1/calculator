export const SET_MORTGAGE_MIN = 'SET_MORTGAGE_MIN';
export const SET_MORTGAGE_MAX = 'SET_MORTGAGE_MAX';
export const SET_MORTGAGE = 'SET_MORTGAGE';
export const SET_TAXES_MIN = 'SET_TAXES_MIN';
export const SET_TAXES_MAX = 'SET_TAXES_MAX';
export const SET_TAXES = 'SET_TAXES';
export const SET_INTEREST_RATE_MIN = 'SET_INTEREST_RATE_MIN';
export const SET_INTEREST_RATE_MAX = 'SET_INTEREST_RATE_MAX';
export const SET_INTEREST_RATE = 'SET_INTEREST_RATE';
export const TEXT_MESSAGE = 'TEXT_MESSAGE';
export const USER_JOINED = 'USER_JOINED';
export const USER_LEFT = 'USER_LEFT';
export const USER_JOINED_ACK = 'USER_JOINED_ACK';
export const RAISE_TOAST = 'RAISE_TOAST';
export const CLOSE_TOAST = 'CLOSE_TOAST';

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
export function userJoined(users) {
  return {
    type: USER_JOINED,
    users: users
  }
}

export function userJoinedAck(thisUser) {
  return {
    type: USER_JOINED_ACK,
    thisUser: thisUser
  }
}

export function userLeft(users) {
  return {
    type: USER_LEFT,
    users: users
  }
}

export function messageReceived(message) {
  return {
    type: TEXT_MESSAGE,
    message: message
  }
}

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