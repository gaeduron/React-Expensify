import { shallow } from 'enzyme';
import React from 'react';
import { LoginPage } from '../../components/LoginPage';

test('should render LoginPage correctly', () => {
	const wrapper = shallow(<LoginPage/>);
	expect(wrapper).toMatchSnapshot();
});

test('should call startLogin on button click', () => {
	let startLogin = jest.fn();
	let wrapper = shallow(<LoginPage startLogin={startLogin}/>);
	wrapper.find('button').simulate('click');
	expect(startLogin).toHaveBeenCalled();
});
