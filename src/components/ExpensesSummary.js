import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total.js';
import numeral from 'numeral';

export const ExpensesSummary = (props) => (
	<p>
		Viewing {
			props.expenses.length
		} expense{
			props.expenses.length > 1 && 's'
		} totalling {
			numeral(getExpensesTotal(props.expenses) / 100)
				.format('$0,0.00')
		}
	</p>
);

const mapStateToProps = (state) => {
	return {
		expenses: selectExpenses(state.expenses, state.filters)
	}
};

export default connect(mapStateToProps)(ExpensesSummary);
