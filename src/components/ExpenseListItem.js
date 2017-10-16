import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseListItem = ({ description, amount, createdAt, id}) => (
	<div>
		<h3>{description}</h3>
		<p>amount: {amount} - date: {createdAt}</p>
		<Link to={`/edit/${id}`}>Edit</Link>
	</div>
);

export default ExpenseListItem;
