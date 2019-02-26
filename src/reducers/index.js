import activeUserId from './activeUserId';
import contacts from './contacts';
import messages from './messages';
import previous from './previous';
import typing from './typing';
import user from './user';

export default function combineReducers(state = {}, action) {
	const previousMessage = state.previous;
	return {
		activeUserId: activeUserId(state.activeUserId, action),
		contacts: contacts(state.contacts, action),
		messages: messages(state.messages, { ...action, previousMessage }),
		previous: previous(state.previous, action),
		typing: typing(state.typing, action),
		user: user(state.user, action)
	};
}
