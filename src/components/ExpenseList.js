import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
	<div>
		<h1>Expense List</h1>
		<p>filtered by: {props.filter}</p>
		{
			props.expenses.length === 0 ? (
				<p>You have 0 expense</p>
			) : (
				props.expenses.map((expense) => 
				<ExpenseListItem key={expense.id} {...expense}/>)
			)
		}
	</div>
);

const mapStateToProps = (state) => {
	return {
		expenses: selectExpenses(state.expenses, state.filters)
	}
};

export default connect(mapStateToProps)(ExpenseList);
