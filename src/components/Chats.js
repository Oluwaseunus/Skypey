import React, { Component } from 'react';
import store from '../store';
import { editMessage } from '../actions';
import './Chats.scss';

const Chat = ({ message }) => {
	// Stores previous value of editable message.
	let prevValue = '';

	// Stores state 😅
	const state = store.getState();

	const { text, is_user_msg } = message;

	const handleBlur = e => {
		const message = e.target.textContent;
		const { activeUserId, messages } = state;
		const number = Object.keys(messages[activeUserId]).filter(
			key => messages[activeUserId][key].text === prevValue
		);
		store.dispatch(
			editMessage(message, activeUserId, number)
		);
		prevValue = '';
	};

	const handleClick = e => {
		const classes = Array.from(e.target.classList);
		if (classes.includes('is-user-message')) {
			prevValue = e.target.textContent;
			e.target.contentEditable = true;
		}
	};

	const handleDelete = e => {
		console.log(e.target);
		const { activeUserId, messages } = state;
		const number = Object.keys(messages[activeUserId]).filter(
			key =>
				messages[activeUserId][key].text ===
				e.target.textContent
		);
		console.log(number);
	};

	return (
		<span
			onBlur={handleBlur}
			className={`Chat ${
				is_user_msg ? 'is-user-message' : ''
			}`}
			onClick={handleClick}
		>
			{text}
		</span>
	);
};

class Chats extends Component {
	componentDidMount = () => {
		this.scrollToBottom();
	};

	componentDidUpdate = () => {
		this.scrollToBottom();
	};

	scrollToBottom = () => {
		this.chatsRef.current.scrollTop = this.chatsRef.current.scrollHeight;
	};

	chatsRef = React.createRef();

	render() {
		return (
			<div className="Chats" ref={this.chatsRef}>
				{this.props.messages.map(message => (
					<Chat message={message} key={message.number} />
				))}
			</div>
		);
	}
}

export default Chats;
