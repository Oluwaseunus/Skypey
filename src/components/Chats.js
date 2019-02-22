import React, { Component } from 'react';
import './Chats.scss';

const Chat = ({ message }) => {
	const { text, is_user_msg } = message;

	return (
		<span
			className={`Chat ${
				is_user_msg ? 'is-user-message' : ''
			}`}
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
