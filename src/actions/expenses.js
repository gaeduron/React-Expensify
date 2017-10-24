import uuid from 'uuid';
import database from '../firebase/firebase'
import { exportArrayFromSnapshot } from '../firebase/utils';

////////DISPATCH ACTIONS////////
//ADD EXPENSE
export const addExpense = (expense) => ({
		type: 'ADD_EXPENSE',
		expense
	});

export const startAddExpense = (expenseData = {}) => {
	return (dispatch) => {
		const {
			description = '',
			note = '',
			amount = 0,
			createdAt = 0
		} = expenseData;
		const expense = { description, note, amount, createdAt };

		return database.ref('expenses').push(expense).then((ref) => {
			dispatch(addExpense({
				id: ref.key,
				...expense
			}));	
		});
	};
};

//REMOVE EXPENSE
export const removeExpense = ({id = 0} = {}) => ({
	type: 'REMOVE_EXPENSE',
	id
});

export const startRemoveExpense = (id = 0) => {
	return (dispatch) => {
		const expenseID = id;
		return database.ref(`expenses/${expenseID}`).remove().then(() => {
			dispatch(removeExpense({
				id: expenseID
			}));	
		});
	};
};

//EDIT EXPENSE
export const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates

});

//SET_EXPENSES
export const setExpenses = (expenses) => ({
	type: 'SET_EXPENSES',
	expenses
});

export const startSetExpenses = () => {
	return (dispatch) => {
		return database.ref('expenses').once('value').then((snapshot) => {
			dispatch(setExpenses(exportArrayFromSnapshot(snapshot)));
		});
	};
};

////////----------------////////
