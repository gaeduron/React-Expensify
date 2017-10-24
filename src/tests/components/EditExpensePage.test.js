import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
	startEditExpense = jest.fn();
	startRemoveExpense = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(<EditExpensePage
								expense={ expenses[1] }
								startEditExpense={startEditExpense}
								startRemoveExpense={startRemoveExpense}
								history={history}
							/>);
});

test('should render EditExpensePage correctly', () => {
	expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
	wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(startEditExpense).toHaveBeenLastCalledWith('2' ,expenses[1]);
});

test('should handle startRemoveExpense', () => {
	wrapper.find('button').prop('onClick')();
	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(startRemoveExpense).toHaveBeenLastCalledWith('2');
});
