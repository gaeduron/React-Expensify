import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { editExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
	onSubmit = (expense) => {
		this.props.editExpense(this.props.expense.id, expense);
		this.props.history.push('/');
	}
	onClick = () => {
		this.props.startRemoveExpense(this.props.expense.id);
		this.props.history.push('/');
	}

	render () {
		return (
			<div>
				<ExpenseForm
					onSubmit={this.onSubmit}
					expense={this.props.expense}
				/>
				<button onClick={this.onClick}>
				Remove
			</button>
		</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	editExpense: (id, expense) => dispatch(editExpense(id ,expense)),
	startRemoveExpense: (id) => dispatch(startRemoveExpense(id))
});

const mapStateToProps = (state, props) => {
	return {
		expense: state.expenses.find((expense) => expense.id === props.match.params.id)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
