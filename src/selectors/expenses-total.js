const getExpensesTotal = (expenses) => {
	let total = 0;
	if (!expenses) {
		return 0;
	} else if (expenses.amount) {
		return expenses.amount;
	} else  {
		expenses.forEach((expense) => {
			if (expense.amount) {
				total += expense.amount;
			}
		})
	}
	return total;
};

export default getExpensesTotal;
