import {
	SET_ACTIVE_USER_ID,
	SET_TYPING_VALUE,
	SEND_MESSAGE,
	DELETE_MESSAGE,
	SET_PREVIOUS
} from '../constants/action-types';

export const setActiveUserId = id => ({
	type: SET_ACTIVE_USER_ID,
	payload: id
});

export const setTypingValue = value => ({
	type: SET_TYPING_VALUE,
	payload: value
});

export const setPrevious = value => ({
	type: SET_PREVIOUS,
	payload: value
});

export const sendMessage = (message, userId, previous) => ({
	type: SEND_MESSAGE,
	payload: { message, userId, previous }
});

export const deleteMessage = (userId, number) => ({
	type: DELETE_MESSAGE,
	payload: { userId, number }
});
