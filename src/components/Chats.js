import React, { Component } from 'react';
import store from '../store';
import { deleteMessage, setTypingValue, setPrevious } from '../actions';
import './Chats.scss';

const Chat = ({ message }) => {
	const { text, is_user_msg } = message;

	const handleClick = e => {
		if (Array.from(e.target.classList).includes('is-user-message')) {
			store.dispatch(setPrevious(removeX(e.target.textContent)));
			store.dispatch(setTypingValue(removeX(e.target.textContent)));
		}
	};

	const handleDelete = e => {
		const { activeUserId, messages } = store.getState();

		const number = Object.keys(messages[activeUserId]).filter(
			key =>
				messages[activeUserId][key].text ===
				removeX(e.target.parentNode.textContent)
		)[0];

		store.dispatch(deleteMessage(activeUserId, number));
	};

	const removeX = text => text.slice(0, text.length - 1);

	return (
		<span
			onClick={handleClick}
			className={`Chat ${is_user_msg ? 'is-user-message' : ''}`}>
			{text}
			<p onClick={handleDelete} className='Chat-x'>
				&times;
			</p>
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
			<div className='Chats' ref={this.chatsRef}>
				{this.props.messages.map(message => (
					<Chat message={message} key={message.number} />
				))}
			</div>
		);
	}
}

export default Chats;
