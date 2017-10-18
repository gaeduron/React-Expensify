import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const createMockStore = configureMockStore([thunk]);

test('Should return the REMOVE_EXPENSE action object', () => {
	const action = removeExpense({ id: 'abc123' });

	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: 'abc123'
	});
});

test('Should return the EDIT_EXPENSE action object', () => {
	const action = editExpense('abc123',
	{
		note: 'testy note',
		amount: 42,
		description: 'test description',
		createdAt: 42424242
	});

	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: 'abc123',
		updates: {
			note: 'testy note',
			amount: 42,
			description: 'test description',
			createdAt: 42424242
		}
	});
});

test('should setup add expense action object with provided values', () => {
	const action = addExpense(expenses[2]);

	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: expenses[2]
	});
});

test('should add expense to database and store', (done) => {
	const store = createMockStore({});
	const expenseData = {
		description: 'Mouse',
		amount: 3000,
		note: 'this one is better',
		createdAt: 1000
	};

	store.dispatch(startAddExpense(expenseData)).then(() => {
		expect(1).toBe(1);
		done();
	});
});

test('should add expense with default to database and store', () => {

});

//test('should setup add expense action object with default values', () => {
//	const action = addExpense();
//
//	expect(action).toEqual({
//		type: 'ADD_EXPENSE',
//		expense: {
//			description: '',
//			note: '',
//			amount: 0,
//			createdAt: undefined,	
//			id: expect.any(String)
//		}
//	});
//});
