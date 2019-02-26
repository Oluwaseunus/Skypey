import { getMessages } from '../static-data';
import { SEND_MESSAGE, DELETE_MESSAGE } from '../constants/action-types';
import _ from 'lodash';

export default function messages(state = getMessages(10), action) {
	switch (action.type) {
		case SEND_MESSAGE: {
			let { message, userId } = action.payload;
			const allUserMsgs = state[userId];

			const number =
				parseInt(
					_.keys(allUserMsgs).filter(
						key => allUserMsgs[key].text === action.previousMessage
					)[0]
				) || +_.keys(allUserMsgs).pop() + 1;

			if (number < _.keys(allUserMsgs).length)
				message = addEditedToMessage(message);

			return {
				...state,
				[userId]: {
					...allUserMsgs,
					[number]: {
						number,
						text: message,
						is_user_msg: true
					}
				}
			};
		}

		case DELETE_MESSAGE: {
			const { userId, number } = action.payload;
			const newState = { ...state };
			delete newState[userId][number];
			return newState;
		}

		default:
			return state;
	}
}

const addEditedToMessage = message =>
	message.slice(-9) === ' (edited)' ? message : message + ' (edited)';
