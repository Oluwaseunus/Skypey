import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import store from './store';
import './styles.css';

const rootElement = document.getElementById('root');
const render = () => {
	ReactDOM.render(<App />, rootElement);
};

render();
store.subscribe(render);
