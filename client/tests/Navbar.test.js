import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Navbar from './navbar';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Navbar />, div);
	ReactDOM.unmountComponentAtNode(div);
});

it('renders welcome message', () => {
	const wrapper = shallow(<Navbar />);
	const welcome = <h1>MOODIFY</h1>;
	expect(wrapper.contains(welcome)).toEqual(true);
});
