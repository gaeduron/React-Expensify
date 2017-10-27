import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore.js';
import getVisibleExpenses from './selectors/expenses.js';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './style/style.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

const store = configureStore();

store.subscribe(() => {
	console.log(store.getState());
});

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);
let hasRendered = false;
const renderApp = () => {
	if (!hasRendered) {
		ReactDOM.render(jsx, document.getElementById('app'));
		hasRendered = true;
	}
};

ReactDOM.render(<LoadingPage/>, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		store.dispatch(login(user.uid));
		store.dispatch(startSetExpenses()).then(() => {
			renderApp();
			if (history.location.pathname == '/') {
				history.push('/dashboard');	
			}
		});
	} else {
		store.dispatch(logout());
		renderApp();
		history.push('/');
	}
})
//123456789012345678901234567890123456789012345678901234567890123456789012345678
//		 1		   2   		 3		   4 		 5		   6		 7		   8
