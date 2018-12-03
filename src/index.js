import Router from 'preact-router';
import { Component, render } from 'preact';
import App from './components/app.jsx';

export default class Main extends Component {
	render() {
		return <Router>
                <App path="/" />
               </Router>;
	}
}