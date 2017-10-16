import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('sould setup default filter value', () => {
 	const state = filtersReducer(undefined, { type: '@@INIT'});
	expect(state).toEqual({
		text: '',
		sortBy: 'date',
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	});
});

test('should set sortBy to amount', () => {
	const state = filtersReducer(undefined, {
		type: 'SORT_BY_AMOUNT',
		sortBy: 'amount'
	});
	expect(state.sortBy).toBe('amount');
})

test('should set sortBy to date', () => {
	const currentState = {
		text: '',
		startDate: undefined,
		endDate: undefined,
		sortBy: 'amount'
	};
	const state = filtersReducer(currentState, {
		type: 'SORT_BY_DATE',
		sortBy: 'date'
	});
	expect(state.sortBy).toBe('date');
})

test('should set text filter', () => {
	const currentState = {
		text: '',
		startDate: undefined,
		endDate: undefined,
		sortBy: 'amount'
	};
	const state = filtersReducer(currentState, {
		type: 'SET_TEXT_FILTER',
		text: 'test text'
	});
	expect(state.text).toBe('test text');
})

test('should set startDate filter', () => {
	const currentState = {
		text: '',
		startDate: undefined,
		endDate: undefined,
		sortBy: 'amount'
	};
	const state = filtersReducer(currentState, {
		type: 'SET_START_DATE',
		startDate: 0
	});
	expect(state.startDate).toBe(0);
})

test('should set endDate filter', () => {
	const currentState = {
		text: '',
		startDate: undefined,
		endDate: undefined,
		sortBy: 'amount'
	};
	const state = filtersReducer(currentState, {
		type: 'SET_END_DATE',
		endDate: 0
	});
	expect(state.endDate).toBe(0);
})
