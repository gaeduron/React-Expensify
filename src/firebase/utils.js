export const exportArrayFromSnapshot = (snapshot) => {
	const expenses = [];
	
	snapshot.forEach((child) => {
		expenses.push({
			id: child.key,
			...child.val()
		});
	});
	return expenses;
};
