import { h, Component } from 'preact';
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

function FileIcon({ fileName }) {
	if (!fileName) fileName = 'sd.sd';

	const type = fileName.match(/.(\w+)$/)[1];
	switch (type) {
		case 'html':
			return (
				<svg class="sidebar__file-icon" viewBox="0 0 24 24">
					<path
						fill="rgb(225, 187, 21)"
						d="M12,17.56L16.07,16.43L16.62,10.33H9.38L9.2,8.3H16.8L17,6.31H7L7.56,12.32H14.45L14.22,14.9L12,15.5L9.78,14.9L9.64,13.24H7.64L7.93,16.43L12,17.56M4.07,3H19.93L18.5,19.2L12,21L5.5,19.2L4.07,3Z"
					/>
				</svg>
			);
		case 'js':
			return (
				<svg class="sidebar__file-icon" viewBox="0 0 24 24">
					<path
						fill="rgb(255, 165, 0)"
						d="M3,3H21V21H3V3M7.73,18.04C8.13,18.89 8.92,19.59 10.27,19.59C11.77,19.59 12.8,18.79 12.8,17.04V11.26H11.1V17C11.1,17.86 10.75,18.08 10.2,18.08C9.62,18.08 9.38,17.68 9.11,17.21L7.73,18.04M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.09,17.06L13.71,17.86Z"
					/>
				</svg>
			);
		case 'css':
			return (
				<svg class="sidebar__file-icon" viewBox="0 0 24 24">
					<path
						fill="rgb(95, 158, 160)"
						d="M5,3L4.35,6.34H17.94L17.5,8.5H3.92L3.26,11.83H16.85L16.09,15.64L10.61,17.45L5.86,15.64L6.19,14H2.85L2.06,18L9.91,21L18.96,18L20.16,11.97L20.4,10.76L21.94,3H5Z"
					/>
				</svg>
			);
	}
}

export class SidePane extends Component {
	addFileButtonClickHandler() {
		this.setState({ isEditing: true });
		setTimeout(() => {
			this.newFileNameInput.focus();
		}, 1);
	}

	addFile() {
		// This gets called twice when enter is pressed, because blur also fires.
		if (!this.newFileNameInput) {
			return;
		}
		const fileName = this.newFileNameInput.value;
		if (fileName) {
			this.props.onAddFile(fileName);
		}
		this.setState({ isEditing: false });
	}
	newFileNameInputKeyDownHandler(e) {
		if (e.which === ENTER_KEY) {
			this.addFile();
		} else if (e.which === ESCAPE_KEY) {
			this.setState({ isEditing: false });
		}
	}
	removeFileClickHandler(file, e) {
		e.stopPropagation();
		const answer = confirm(`Are you sure you want to delete ${file.name}?`);
		if (answer) {
			this.props.onRemoveFile(file);
		}
	}
	render() {
		const { files, onFileSelect, selectedFile, onRemoveFile } = this.props;

		return (
			<div class="sidebar">
				<div class="flex jc-sb">
					Files
					<div>
						<button
							type="button"
							class="btn--dark"
							onClick={this.addFileButtonClickHandler.bind(this)}
						>
							<svg
								viewBox="0 0 24 24"
								style="vertical-align:middle;width:14px;height:14px"
							>
								<path d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M11,15V12H9V15H6V17H9V20H11V17H14V15H11Z" />
							</svg>
						</button>
					</div>
				</div>
				{this.state.isEditing ? (
					<div>
						<input
							type="text"
							ref={el => (this.newFileNameInput = el)}
							onBlur={this.addFile.bind(this)}
							onKeyUp={this.newFileNameInputKeyDownHandler.bind(this)}
						/>
					</div>
				) : null}
				{files.map(file => (
					<div>
						<button
							class={`sidebar__file  ${
								selectedFile === file ? 'selected' : ''
							}`}
							type="button"
							onClick={onFileSelect.bind(null, file)}
						>
							<div class="flex flex-v-center">
								<FileIcon fileName={file.name} />
								{file.name}
							</div>
							<div class="sidebar__file-options">
								<button
									type="button"
									class="btn btn--dark"
									onClick={this.removeFileClickHandler.bind(this, file)}
								>
									<svg
										viewBox="0 0 24 24"
										style="vertical-align:middle;width:14px;height:14px"
									>
										<path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
									</svg>
								</button>
							</div>
						</button>
					</div>
				))}
			</div>
		);
	}
}
