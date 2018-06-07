import { h, Component } from 'preact';
import CodeMirror from '../CodeMirror';

import 'codemirror/mode/javascript/javascript.js';

export default class CodeMirrorBox extends Component {
	componentDidMount() {
		this.initEditor();
	}
	shouldComponentUpdate() {
		return false;
	}

	initEditor() {
		const options = this.props.options;
		this.cm = CodeMirror.fromTextArea(this.textarea, this.props.options);
		this.props.onCreation(this.cm);
	}

	render() {
		return (
			<textarea
				ref={el => (this.textarea = el)}
				name=""
				id=""
				cols="30"
				rows="10"
			/>
		);
	}
}
