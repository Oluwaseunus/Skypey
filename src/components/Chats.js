import React, { Component } from 'react';
import store from '../store';
import { editMessage, deleteMessage } from '../actions';
import './Chats.scss';

class Chat extends Component {
	state = store.getState();

	componentDidMount = () => this.setEditableRef();
	componentDidUpdate = () => this.setEditableRef();

	setEditableRef = () => {
		const { current } = this.spanRef;
		if (
			Array.from(current.classList).includes(
				'is-user-message'
			)
		) {
			current.contentEditable = true;
		}
	};

	spanRef = React.createRef();
	prevValue = '';

	removeX = text => text.slice(0, text.length - 1);

	handleBlur = e => {
		const message = this.removeX(e.target.textContent);
		const { activeUserId, messages } = this.state;
		const number = Object.keys(messages[activeUserId]).filter(
			key =>
				messages[activeUserId][key].text === this.prevValue
		)[0];
		store.dispatch(
			editMessage(message, activeUserId, number)
		);
	};

	handleClick = e => {
		this.prevValue = this.removeX(e.target.textContent);
	};

	handleDelete = e => {
		console.log(
			this.removeX(e.target.parentNode.textContent)
		);
		const { activeUserId, messages } = this.state;
		const number = Object.keys(messages[activeUserId]).filter(
			key =>
				messages[activeUserId][key].text ===
				this.removeX(e.target.parentNode.textContent)
		)[0];
		console.log(number);
		store.dispatch(deleteMessage(activeUserId, number));
	};

	render() {
		const { text, is_user_msg } = this.props.message;

		return (
			<span
				onBlur={this.handleBlur}
				onClick={this.handleClick}
				className={`Chat ${
					is_user_msg ? 'is-user-message' : ''
				}`}
				ref={this.spanRef}
			>
				{text}
				<p
					contentEditable
					onClick={this.handleDelete}
					className="Chat-x"
				>
					&times;
				</p>
			</span>
		);
	}
}

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
