import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
	<div>
		<h1>Info</h1>
		<p>The info is: {props.info}</p>
	</div>
);

const withAdminWarning = (WrappedComponent) => {
	return (props) => (
		<div>
			{props.isAdmin && <p>THIS IS PRIVATE INFO PLEASE DONT SHARE</p>}
			<WrappedComponent {...props}/>
		</div>
	);
};

const requireAuthentication = (WrappedComponent) => {
	return (props) => (
		<div>
			{
				props.isAuth ? 
					<WrappedComponent {...props}/> :
					<p>Please login to access this section of the site</p>
			}
		</div>
	);
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);


ReactDOM.render(<AuthInfo isAuth={true} info="there are the details"/>, document.getElementById('app'));
