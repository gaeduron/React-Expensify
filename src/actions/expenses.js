import uuid from 'uuid';

				////////DISPATCH ACTIONS////////
//ADD EXPENSE
export const addExpense = (
	{
		description = '',
		note = '',
		amount = 0,
		createdAt = undefined
	} = {}
) => (
	{
		type: 'ADD_EXPENSE',
		expense: {
			id: uuid(),
			description,
			note,
			amount,
			createdAt
		}
	}
);

//REMOVE EXPENSE
export const removeExpense = ({id = 0} = {}) => ({
	type: 'REMOVE_EXPENSE',
	id
});

//EDIT EXPENSE
export const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates

});
				////////----------------////////
