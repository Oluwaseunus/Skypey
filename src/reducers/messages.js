import { getMessages } from '../static-data';
import {
	SEND_MESSAGE,
	EDIT_MESSAGE,
	DELETE_MESSAGE
} from '../constants/action-types';
import _ from 'lodash';

export default function messages(
	state = getMessages(10),
	action
) {
	switch (action.type) {
		case SEND_MESSAGE: {
			const { message, userId } = action.payload;
			const allUserMsgs = state[userId];
			const number = +_.keys(allUserMsgs).pop() + 1;

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

		case EDIT_MESSAGE: {
			const { message, userId, number } = action.payload;
			const allUserMsgs = state[userId];
			const numberMessage = allUserMsgs[number];
			if (numberMessage.text !== message) {
				return {
					...state,
					[userId]: {
						...allUserMsgs,
						[number]: {
							...numberMessage,
							text: message + ' (edited)'
						}
					}
				};
			}
			return state;
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
