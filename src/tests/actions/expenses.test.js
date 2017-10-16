import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

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
	const action = addExpense({
		description: 'abc123',
		note: 'abc123',
		amount: 4200,
		createdAt: 42424242,
	});

	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			description: 'abc123',
			note: 'abc123',
			amount: 4200,
			createdAt: 42424242,
			id: expect.any(String)
		}
	});
});

test('should setup add expense action object with default values', () => {
	const action = addExpense();

	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			description: '',
			note: '',
			amount: 0,
			createdAt: undefined,	
			id: expect.any(String)
		}
	});
});
