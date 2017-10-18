import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore.js';
import getVisibleExpenses from './selectors/expenses.js';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import 'normalize.css/normalize.css';
import './style/style.scss';
import 'react-dates/lib/css/_datepicker.css';
import './firebase/firebase';

const store = configureStore();

store.subscribe(() => {
	console.log(store.getState());
});

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));

//123456789012345678901234567890123456789012345678901234567890123456789012345678
//		 1		   2   		 3		   4 		 5		   6		 7		   8
