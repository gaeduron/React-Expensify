import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';


test('should set default state', () => {
	const state = expensesReducer(undefined, { type: '@@INIT' });
	expect(state).toEqual([]);
});

test('should remove expense by id', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: expenses[1].id
	}
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remote expenses if id is not defined', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: '-1'
	}
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});

test('should add an expense', () => {
	const newExpense = {
		id: '4',
		description: 'Car rent',
		note: '',
		amount: 43000,
		createdAt: 0
	};
	const action = {
		type: 'ADD_EXPENSE',
		expense: newExpense
	}
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([...expenses, newExpense]);
});

test('should edit an expense', () => {
	const editedExpense = {
		description: 'Car rent',
	};
	const action = {
		type: 'EDIT_EXPENSE',
		id: 1,
		updates: editedExpense
	}
	const state = expensesReducer(expenses, action);
	expect(state[0].description).toEqual('Car rent');
});

test('should not edit an expense if expense not found', () => {
	const editedExpense = {
		description: 'Car rent',
	};
	const action = {
		type: 'EDIT_EXPENSE',
		id: '-1',
		updates: editedExpense
	}
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});
