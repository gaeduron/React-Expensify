import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			description: props.expense ? props.expense.description : '',
			note: props.expense ? props.expense.note : '',
			amount: props.expense ? (props.expense.amount / 100).toString() : '',
			createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
			calendarFocused: false,
			error: ''
		};
	}

	onDescriptionChange = (e) => {
		const description = e.target.value;
		this.setState(() => ({ description }));
	};

	onNoteChange = (e) => {
		const note = e.target.value;
		this.setState(() => ({ note }));
	};

	onAmountChange = (e) => {
		const amount = e.target.value;
		amount.match(!amount || /^\d{1,}(\.\d{0,2})?$/) && 
			this.setState(() => ({ amount }));
	};

	onDateChange = (createdAt) => {
		createdAt && this.setState(() => ({ createdAt }));
	};

	onFocusChange = ({ focused }) => {
		this.setState(() => ({ calendarFocused: focused }));
	};

	onSubmit = (e) => {
		e.preventDefault();
		
		if (!this.state.description || !this.state.amount) {
			this.setState({
				error: 'Please write a description and the amount of the expense'
			})	
		} else {	
			this.setState({
				error: false
			})
			this.props.onSubmit({
				description: this.state.description,
				note: this.state.note,
				amount: parseFloat(this.state.amount, 10) * 100,
				createdAt: this.state.createdAt.valueOf(),
			})	
		}
	};

	render() {
		return (
			<form className="form" onSubmit={this.onSubmit}>
				{this.state.error && <p className="form__error">{this.state.error}</p>}
				<input
					className="text-input"
					placeholder="description" 
					type="text"
					value={this.state.description}
					onChange={this.onDescriptionChange}
				/>
				<input 
					className="text-input"
					placeholder="amount" 
					type="text"
					value={this.state.amount}
					onChange={this.onAmountChange}
				/>
				<SingleDatePicker
					date={this.state.createdAt}
					onDateChange={this.onDateChange}
					focused={this.state.calendarFocused}
					onFocusChange={this.onFocusChange}
					numberOfMonths={1}
					isOutsideRange={() => false}
				/>
				<textarea
					className="textarea"
					placeholder="Add here some notes about your expence."
					rows="10"
					cols="30" 
					value={this.state.note}
					onChange={this.onNoteChange}
				>
				</textarea>
				<div>
					<button className="button">Add Expense</button>
				</div>
			</form>
		)
	}
}
