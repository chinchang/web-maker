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
						d="M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z"
					/>
				</svg>
			);
		/* return (
				<svg class="sidebar__file-icon" viewBox="0 0 24 24">
					<path
						fill="rgb(225, 187, 21)"
						d="M12,17.56L16.07,16.43L16.62,10.33H9.38L9.2,8.3H16.8L17,6.31H7L7.56,12.32H14.45L14.22,14.9L12,15.5L9.78,14.9L9.64,13.24H7.64L7.93,16.43L12,17.56M4.07,3H19.93L18.5,19.2L12,21L5.5,19.2L4.07,3Z"
					/>
				</svg>
			); */
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
		case 'md':
		case 'markdown':
			return (
				<svg class="sidebar__file-icon" viewBox="0 0 24 24">
					<path
						fill="skyblue"
						d="M2,16V8H4L7,11L10,8H12V16H10V10.83L7,13.83L4,10.83V16H2M16,8H19V12H21.5L17.5,16.5L13.5,12H16V8Z"
					/>
				</svg>
			);
		case 'jpg':
		case 'jpeg':
		case 'svg':
		case 'png':
			return (
				<svg class="sidebar__file-icon" viewBox="0 0 24 24">
					<path
						fill="crimson"
						d="M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z"
					/>
				</svg>
			);
		case 'jsx':
		case 'tsx':
			return (
				<svg class="sidebar__file-icon" viewBox="0 0 24 24">
					<path
						fill="rebeccapurple"
						d="M12,10.11C13.03,10.11 13.87,10.95 13.87,12C13.87,13 13.03,13.85 12,13.85C10.97,13.85 10.13,13 10.13,12C10.13,10.95 10.97,10.11 12,10.11M7.37,20C8,20.38 9.38,19.8 10.97,18.3C10.45,17.71 9.94,17.07 9.46,16.4C8.64,16.32 7.83,16.2 7.06,16.04C6.55,18.18 6.74,19.65 7.37,20M8.08,14.26L7.79,13.75C7.68,14.04 7.57,14.33 7.5,14.61C7.77,14.67 8.07,14.72 8.38,14.77C8.28,14.6 8.18,14.43 8.08,14.26M14.62,13.5L15.43,12L14.62,10.5C14.32,9.97 14,9.5 13.71,9.03C13.17,9 12.6,9 12,9C11.4,9 10.83,9 10.29,9.03C10,9.5 9.68,9.97 9.38,10.5L8.57,12L9.38,13.5C9.68,14.03 10,14.5 10.29,14.97C10.83,15 11.4,15 12,15C12.6,15 13.17,15 13.71,14.97C14,14.5 14.32,14.03 14.62,13.5M12,6.78C11.81,7 11.61,7.23 11.41,7.5C11.61,7.5 11.8,7.5 12,7.5C12.2,7.5 12.39,7.5 12.59,7.5C12.39,7.23 12.19,7 12,6.78M12,17.22C12.19,17 12.39,16.77 12.59,16.5C12.39,16.5 12.2,16.5 12,16.5C11.8,16.5 11.61,16.5 11.41,16.5C11.61,16.77 11.81,17 12,17.22M16.62,4C16,3.62 14.62,4.2 13.03,5.7C13.55,6.29 14.06,6.93 14.54,7.6C15.36,7.68 16.17,7.8 16.94,7.96C17.45,5.82 17.26,4.35 16.62,4M15.92,9.74L16.21,10.25C16.32,9.96 16.43,9.67 16.5,9.39C16.23,9.33 15.93,9.28 15.62,9.23C15.72,9.4 15.82,9.57 15.92,9.74M17.37,2.69C18.84,3.53 19,5.74 18.38,8.32C20.92,9.07 22.75,10.31 22.75,12C22.75,13.69 20.92,14.93 18.38,15.68C19,18.26 18.84,20.47 17.37,21.31C15.91,22.15 13.92,21.19 12,19.36C10.08,21.19 8.09,22.15 6.62,21.31C5.16,20.47 5,18.26 5.62,15.68C3.08,14.93 1.25,13.69 1.25,12C1.25,10.31 3.08,9.07 5.62,8.32C5,5.74 5.16,3.53 6.62,2.69C8.09,1.85 10.08,2.81 12,4.64C13.92,2.81 15.91,1.85 17.37,2.69M17.08,12C17.42,12.75 17.72,13.5 17.97,14.26C20.07,13.63 21.25,12.73 21.25,12C21.25,11.27 20.07,10.37 17.97,9.74C17.72,10.5 17.42,11.25 17.08,12M6.92,12C6.58,11.25 6.28,10.5 6.03,9.74C3.93,10.37 2.75,11.27 2.75,12C2.75,12.73 3.93,13.63 6.03,14.26C6.28,13.5 6.58,12.75 6.92,12M15.92,14.26C15.82,14.43 15.72,14.6 15.62,14.77C15.93,14.72 16.23,14.67 16.5,14.61C16.43,14.33 16.32,14.04 16.21,13.75L15.92,14.26M13.03,18.3C14.62,19.8 16,20.38 16.62,20C17.26,19.65 17.45,18.18 16.94,16.04C16.17,16.2 15.36,16.32 14.54,16.4C14.06,17.07 13.55,17.71 13.03,18.3M8.08,9.74C8.18,9.57 8.28,9.4 8.38,9.23C8.07,9.28 7.77,9.33 7.5,9.39C7.57,9.67 7.68,9.96 7.79,10.25L8.08,9.74M10.97,5.7C9.38,4.2 8,3.62 7.37,4C6.74,4.35 6.55,5.82 7.06,7.96C7.83,7.8 8.64,7.68 9.46,7.6C9.94,6.93 10.45,6.29 10.97,5.7Z"
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
	/**
	 * Checks if the passed filename already exists and if so, warns the user.
	 * Also it passes false if the validation fails.
	 * @param {string} newFileName New file name to validate
	 */
	warnForExistingFileName(newFileName) {
		// We also check for fileBeingRenamed !== file because when a file being renamed is
		// asked to be set same name, then that should not match and warn here.
		if (
			this.props.files.some(
				file =>
					file.name === newFileName && this.state.fileBeingRenamed !== file
			)
		) {
			alert(`A file with name ${newFileName} already exists.`);
			return false;
		}
		return true;
	}

	addFile() {
		// This gets called twice when enter is pressed, because blur also fires.
		if (!this.newFileNameInput) {
			return;
		}
		const newFileName = this.newFileNameInput.value;
		if (!this.warnForExistingFileName(newFileName)) {
			return;
		}
		if (newFileName) {
			this.props.onAddFile(newFileName);
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
	renameFile() {
		// This gets called twice when enter is pressed, because blur also fires.
		if (!this.renameFileNameInput) {
			return;
		}
		const newFileName = this.renameFileNameInput.value;
		if (!this.warnForExistingFileName(newFileName)) {
			return;
		}
		if (newFileName) {
			this.props.onRenameFile(this.state.fileBeingRenamed.name, newFileName);
		}
		this.setState({ fileBeingRenamed: null });
	}
	renameFileNameInputKeyDownHandler(e) {
		if (e.which === ENTER_KEY) {
			this.renameFile();
		} else if (e.which === ESCAPE_KEY) {
			this.setState({ fileBeingRenamed: null });
		}
	}
	renameFileClickHandler(file, e) {
		e.stopPropagation();
		this.setState({
			fileBeingRenamed: file
		});
		setTimeout(() => {
			this.renameFileNameInput.focus();
		}, 1);
	}
	render() {
		const { files, onFileSelect, selectedFile, onRemoveFile } = this.props;

		return (
			<div class="sidebar">
				<div class="flex jc-sb" style="padding: 5px 4px">
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
						{file === this.state.fileBeingRenamed ? (
							<input
								type="text"
								ref={el => (this.renameFileNameInput = el)}
								value={file.name}
								onBlur={this.renameFile.bind(this)}
								onKeyUpCapture={this.renameFileNameInputKeyDownHandler.bind(
									this
								)}
							/>
						) : (
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
										onClick={this.renameFileClickHandler.bind(this, file)}
									>
										<svg
											viewBox="0 0 24 24"
											style="vertical-align:middle;width:14px;height:14px"
										>
											<path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
										</svg>
									</button>

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
						)}
					</div>
				))}
			</div>
		);
	}
}
