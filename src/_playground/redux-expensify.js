import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

				////////DISPATCH ACTIONS////////
//ADD EXPENSE
const addExpense = (
	{
		description = '',
		note = '',
		amount = 0,
		createdAt = undefined
	} = {}
) => (
	{
		type: 'ADD_EXPENSE',
		expense: {
			id: uuid(),
			description,
			note,
			amount,
			createdAt
		}
	}
);

//REMOVE EXPENSE
const removeExpense = ({id = 0} = {}) => ({
	type: 'REMOVE_EXPENSE',
	id
});

//EDIT EXPENSE
const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates

});

//SET TEXT FILTER
const setTextFilter = (text = "") => ({
	type: 'SET_TEXT_FILTER',
	text: text
});

//SORT BY AMOUNT
const sortByAmount = () => ({
	type: 'SORT_BY_AMOUNT',
	sortBy: 'amount'
});

//SORT BY DATE
const sortByDate = () => ({
	type: 'SORT_BY_DATE',
	sortBy: 'date'
});

//SET START DATE
const setStartDate = (date = undefined) => ({
	type: 'SET_START_DATE',
	startDate: date
})

//SET END DATE
const setEndDate = (date = undefined) => ({
	type: 'SET_END_DATE',
	endDate: date
})
				////////----------------////////

//REDUCERS

const expensesDefaultState = [];

const expensesReducer = (state = expensesDefaultState, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			return [...state, action.expense];
		case 'REMOVE_EXPENSE':
			return state.filter(expense => expense.id !== action.id);
		case 'EDIT_EXPENSE':
			return state.map((expense) => {
				if (expense.id == action.id) {
					return {
						...expense,
						...action.updates
					}
				} else {
					return expense;
				}
			});
		default:
			return state;
	}
};

const filtersDefaultState = {
	text: '',
	sortBy: 'date',
	startDate: undefined,
	endDate: undefined
};

const filtersReducer = (state = filtersDefaultState, action) => {
	switch (action.type) {
		case 'SET_TEXT_FILTER':
			return {
				...state,
				text: action.text
			};
		case 'SORT_BY_AMOUNT':
			return {
				...state,
				sortBy: action.sortBy
			};
		case 'SORT_BY_DATE':
			return {
				...state,
				sortBy: action.sortBy
			};
		case 'SET_START_DATE':
			return {
				...state,
				startDate: action.startDate
			};
		case 'SET_END_DATE':
			return {
				...state,
				endDate: action.endDate
			};
		default:
			return state;
	}
};

//STORE

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
	let visibleExpenses = expenses.filter((expense) => {
		let matchText = 
			text == "" ||
			expense.description.includes(text.toLowerCase) || 
			expense.note.includes(text.toLowerCase);
		let matchStartDate = 
			typeof startDate !== 'number' || expense.createdAt >= startDate;
		let matchEndDate = 
			typeof endDate !== 'number' || expense.createdAt <= endDate
		
		if (matchText && matchEndDate && matchStartDate) {
			return expense
		}
	})

	if (sortBy == 'date') {
		return visibleExpenses.sort((a, b) => {
			if (a.createdAt < b.createdAt) { return -1 }
			if (a.createdAt > b.createdAt) { return 1 }
			return 0;
		});
	} else {
		return visibleExpenses.sort((a, b) => {
			if (a.amount < b.amount) { return -1 }
			if (a.amount > b.amount) { return 1 }
			return 0;
		});
	}
};

const store = createStore(
	combineReducers({
		expenses: expensesReducer,
		filters: filtersReducer
	})
);

store.subscribe(() => {
	let state = store.getState();
	let filteredExpenses = getVisibleExpenses(state.expenses, state.filters)
	console.log(filteredExpenses);
});

//-----------> ACTION TEST ----------->

//const expenseOne = store.dispatch(addExpense());
//
store.dispatch(addExpense({
	note: 'First payment',
	description: 'Apartement 351B Rent',
	amount: 63400,
	createdAt: 100
}));

store.dispatch(addExpense({
	note: 'final payment',
	description: 'Apartement 351B Rent',
	amount: 63400,
	createdAt: 200
}));

store.dispatch(addExpense({
	note: 'Extra payment',
	description: 'Apartement 351B Rent',
	amount: 3400,
	createdAt: 130
}));
//
//store.dispatch(editExpense(expenseOne.expense.id, {note: 'Will be destroyed'}));
//
//store.dispatch(removeExpense({id: expenseOne.expense.id}));

//store.dispatch(setTextFilter('rent'));
//store.dispatch(setTextFilter());

//store.dispatch(sortByAmount());
//store.dispatch(sortByDate());

store.dispatch(setStartDate(125));
//store.dispatch(setStartDate());
store.dispatch(setEndDate(140));




//	expenses: [{
//		id: 'poikgposkgrg',
//		description: 'January Rent',
//		note: 'this is the final payement',
//		amount: 54500,
//		createdAt: 0
//	}],
//	filters: {
//		text: 'rent',
//		sortBy: 'amount', //date or amount
//		startDate: undefined,
//		endDate: undefined
//	}
