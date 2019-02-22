import React from 'react';
import store from '../store';
import { setTypingValue, sendMessage } from '../actions';
import './MessageInput.scss';

const MessageInput = ({ value }) => {
	const handleChange = e => {
		store.dispatch(setTypingValue(e.target.value));
	};

	const handleSubmit = e => {
		e.preventDefault();
		const { typing, activeUserId } = store.getState();
		store.dispatch(sendMessage(typing, activeUserId));
	};

	return (
		<form onSubmit={handleSubmit} className="Message">
			<input
				type="text"
				className="Message__input"
				placeholder="Write a message..."
				onChange={handleChange}
				value={value}
			/>
		</form>
	);
};

export default MessageInput;
