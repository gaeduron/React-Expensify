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

const store = configureStore();

store.subscribe(() => {
	console.log(store.getState());
});

/// ACTIONS
store.dispatch(addExpense(
	{
		description: 'Water bill',
		note:'Immediate payement needed',
		amount: 8600,
		createdAt: 120
	}
));

store.dispatch(addExpense(
	{
		description: 'Gas bill',
		note:'Immediate payement needed',
		amount: 5642,
		createdAt: 122
	}
));

store.dispatch(addExpense(
	{
		description: 'Rent',
		note:'Immediate payement needed',
		amount: 60000,
		createdAt: 111
	}
));

const state = store.getState();

console.log(
	getVisibleExpenses(state.expenses, state.filters)
);
/// END ACTION

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));

//123456789012345678901234567890123456789012345678901234567890123456789012345678
//		 1		   2   		 3		   4 		 5		   6		 7		   8
