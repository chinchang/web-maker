import { h, Component } from 'preact';
import Footer from '../src/components/Footer';
import { Link } from 'preact-router/match';
// See: https://github.com/mzgoddard/preact-render-spy
import { shallow, deep } from 'preact-render-spy';

describe('Initial Test of the Footer', () => {
	test('Footer renders 1 link with an ID of notificationsBtn', () => {
		const context = shallow(<Footer prefs={{}} />);
		expect(context.find('#notificationsBtn').exists()).toBeTruthy();
	});
});
