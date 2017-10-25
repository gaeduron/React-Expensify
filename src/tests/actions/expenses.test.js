import { startAddExpense, startRemoveExpense, startEditExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);
const uid = 'thisismytestuid';
const defaultAuthState=  {auth: { uid }};

beforeEach((done) => {
	const expensesData = {};
	expenses.forEach(({id, description, note, amount, createdAt}) => {
		expensesData[id] = { description, note, amount, createdAt }
	})
	database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

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
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseData
			}
		});

		database.ref(`expenses/${actions[0].expense.id}`).once('value').then((snapshot) => {
			expect(snapshot.val()).toEqual(expenseData);
			done();
		});
	});
});

test('should add expense with default to database and store', (done) => {
	const store = createMockStore(defaultAuthState);
	const expenseData = {
		description: '',
		amount: 0,
		note: '',
		createdAt: 0
	};

	store.dispatch(startAddExpense(expenseData)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseData
			}
		});

		database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value').then((snapshot) => {
			expect(snapshot.val()).toEqual(expenseData);
			done();
		});
	});
});

test('should setup set expense action object with data', () => {
	const action = setExpenses(expenses);
	expect(action).toEqual({
		type: 'SET_EXPENSES',
		expenses
	});
});

test('should fetch the expenses from firebase', (done) => {
	const store = createMockStore(defaultAuthState);
	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		});
		done();
	});
});

test('should remove expense from database', (done) => {
	const store = createMockStore(defaultAuthState);
	const expenseID = 1;

	store.dispatch(startRemoveExpense(expenseID)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'REMOVE_EXPENSE',
			id: 1
		});

		database.ref(`users/${uid}/expenses/${expenseID}`).once('value').then((snapshot) => {
			expect(snapshot.val()).toBeFalsy();
			done();
		});
	});

});

test('should edit expense on database', (done) => {
	const store = createMockStore(defaultAuthState);
	const expenseID = 2;
	const updates = { note: 'Important note test !' };

	store.dispatch(startEditExpense(expenseID, updates)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'EDIT_EXPENSE',
			id: 2,
			updates
		});

		database.ref(`users/${uid}/expenses/${expenseID}/note`).once('value').then((snapshot) => {
			expect(snapshot.val()).toBe('Important note test !');
			done();
		});
	});

});
