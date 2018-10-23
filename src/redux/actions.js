export const SET_MORTGAGE_MIN = 'SET_MORTGAGE_MIN';
export const SET_MORTGAGE_MAX = 'SET_MORTGAGE_MAX';
export const SET_MORTGAGE = 'SET_MORTGAGE';
export const SET_TAXES_MIN = 'SET_TAXES_MIN';
export const SET_TAXES_MAX = 'SET_TAXES_MAX';
export const SET_TAXES = 'SET_TAXES';
export const SET_INTEREST_RATE_MIN = 'SET_INTEREST_RATE_MIN';
export const SET_INTEREST_RATE_MAX = 'SET_INTEREST_RATE_MAX';
export const SET_INTEREST_RATE = 'SET_INTEREST_RATE';

export function setValue(type, parent, val) {
	return {
		type: [type],
		payload: {
			val: val,
			parent: parent,
		}
	}
}
