import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import store from './store';
import './styles.css';

const rootElement = document.getElementById('root');
const render = () => {
	fancyLog();
	ReactDOM.render(<App />, rootElement);
};

render();
store.subscribe(render);

function fancyLog() {
	console.log(
		'%c Rendered with 👉 👉 👇',
		'background: purple; color: #FFF'
	);
	console.log(store.getState());
}
