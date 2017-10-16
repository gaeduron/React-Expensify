//SET TEXT FILTER
export const setTextFilter = (text = "") => ({
	type: 'SET_TEXT_FILTER',
	text: text
});

//SORT BY AMOUNT
export const sortByAmount = () => ({
	type: 'SORT_BY_AMOUNT',
	sortBy: 'amount'
});

//SORT BY DATE
export const sortByDate = () => ({
	type: 'SORT_BY_DATE',
	sortBy: 'date'
});

//SET START DATE
export const setStartDate = (date = undefined) => ({
	type: 'SET_START_DATE',
	startDate: date
})

//SET END DATE
export const setEndDate = (date = undefined) => ({
	type: 'SET_END_DATE',
	endDate: date
})
