import { render } from 'preact';
import Router from 'preact-router';
import App from './components/app.jsx';

import './lib/codemirror/lib/codemirror.css';
import './lib/codemirror/addon/hint/show-hint.css';
import './lib/codemirror/addon/fold/foldgutter.css';
import './lib/codemirror/addon/dialog/dialog.css';
import './lib/hint.min.css';
import './lib/inlet.css';
import './style.css';

function AppRouter() {
	return (
		<Router>
			<App path="/" />
			<App path="/create/:itemId" />
			<App path="/app/create/:itemId" />
			<App default />
		</Router>
	);
}

render(<AppRouter />, document.getElementById('root'));
