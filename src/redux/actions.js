export const START_CREATE_SECRET = 'START_CREATE_SECRET';
export const FAILED_CREATE_SECRET = 'FAILED_CREATE_SECRET';
export const SUCCESS_CREATE_SECRET = 'SUCCESS_CREATE_SECRET';
export const START_FETCH_SECRET = 'START_FETCH_SECRET';
export const FAILED_FETCH_SECRET = 'FAILED_FETCH_SECRET';
export const SUCCESS_FETCH_SECRET = 'SUCCESS_FETCH_SECRET';
export const CLEAR_PREVIOUS_REQUEST = 'CLEAR_PREVIOUS_REQUEST';

export function submitSecret(secret) {
	return {
		type: START_CREATE_SECRET,
		payload: secret
	}
}

export function fetchSecret(token) {
	return {
		type: START_FETCH_SECRET,
		payload: token
	}
}

export function clearPastRequest() {
	return {
		type: CLEAR_PREVIOUS_REQUEST,
		payload: {
            status: 200,
            reason: ""
        }
	}
}