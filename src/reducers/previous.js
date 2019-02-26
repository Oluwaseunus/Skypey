import { SET_PREVIOUS, SEND_MESSAGE } from '../constants/action-types';

export default function previous(state = '', action) {
	switch (action.type) {
		case SET_PREVIOUS:
			return action.payload;
		case SEND_MESSAGE:
			return '';
		default:
			return state;
	}
}
