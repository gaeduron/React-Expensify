import moment from 'moment';

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
	let visibleExpenses = expenses.filter((expense) => {
		let expenseCreationMoment = moment(expense.createdAt);
		let matchText = 
			text === "" ||
			expense.description.toLowerCase().includes(text.toLowerCase()) || 
			expense.note.toLowerCase().includes(text.toLowerCase());
		let matchStartDate = 
			!startDate || expenseCreationMoment.isSameOrAfter(startDate, 'day');
		let matchEndDate = 
			!endDate || expenseCreationMoment.isSameOrBefore(endDate, 'day');
		if (matchText && matchEndDate && matchStartDate) {
			return expense
		}
	})

	if (sortBy == 'date') {
		return visibleExpenses.sort((a, b) => {
			if (a.createdAt > b.createdAt) { return -1 }
			if (a.createdAt < b.createdAt) { return 1 }
			return 0;
		});
	} else {
		return visibleExpenses.sort((a, b) => {
			if (a.amount > b.amount) { return -1 }
			if (a.amount < b.amount) { return 1 }
			return 0;
		});
	}
};

export default getVisibleExpenses;
