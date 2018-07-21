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
		this.cm = CodeMirror.fromTextArea(this.textarea, this.props.options);
		if (this.props.onChange) {
			this.cm.on('change', this.props.onChange);
		}
		if (this.props.onBlur) {
			this.cm.on('blur', this.props.onBlur);
		}
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
