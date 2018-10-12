import { h, Component } from 'preact';
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

function FileIcon({ file }) {
	let path;
	if (file.isFolder) {
		if (!file.children.length) {
			path = (
				<path
					fill="currentColor"
					d="M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z"
				/>
			);
		} else {
			path = file.isCollapsed ? (
				<path
					fill="currentColor"
					d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z"
				/>
			) : (
				<path
					fill="currentColor"
					d="M19,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,4 4,4H10L12,6H19A2,2 0 0,1 21,8H21L4,8V18L6.14,10H23.21L20.93,18.5C20.7,19.37 19.92,20 19,20Z"
				/>
			);
		}
	} else {
		const type = file.name.match(/.(\w+)$/)[1];
		switch (type) {
			case 'html':
				path = (
					<path
						fill="rgb(225, 187, 21)"
						d="M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z"
					/>
				);
				break;

			case 'js':
				path = (
					<path
						fill="rgb(255, 165, 0)"
						d="M3,3H21V21H3V3M7.73,18.04C8.13,18.89 8.92,19.59 10.27,19.59C11.77,19.59 12.8,18.79 12.8,17.04V11.26H11.1V17C11.1,17.86 10.75,18.08 10.2,18.08C9.62,18.08 9.38,17.68 9.11,17.21L7.73,18.04M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.09,17.06L13.71,17.86Z"
					/>
				);
				break;

			case 'css':
				path = (
					<path
						fill="rgb(95, 158, 160)"
						d="M5,3L4.35,6.34H17.94L17.5,8.5H3.92L3.26,11.83H16.85L16.09,15.64L10.61,17.45L5.86,15.64L6.19,14H2.85L2.06,18L9.91,21L18.96,18L20.16,11.97L20.4,10.76L21.94,3H5Z"
					/>
				);
				break;

			case 'md':
			case 'markdown':
				path = (
					<path
						fill="skyblue"
						d="M2,16V8H4L7,11L10,8H12V16H10V10.83L7,13.83L4,10.83V16H2M16,8H19V12H21.5L17.5,16.5L13.5,12H16V8Z"
					/>
				);
				break;

			case 'jpg':
			case 'jpeg':
			case 'svg':
			case 'png':
				path = (
					<path
						fill="crimson"
						d="M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z"
					/>
				);
				break;
		}
	}
	return (
		<svg class="sidebar__file-icon" viewBox="0 0 24 24">
			{path}
		</svg>
	);
}

function File({
	file,
	selectedFile,
	fileBeingRenamed,
	onFileSelect,
	onRenameBtnClick,
	onRemoveBtnClick,
	onNameInputBlur,
	onNameInputKeyUp,
	onFileDrop
}) {
	function focusInput(el) {
		el &&
			setTimeout(() => {
				el.focus();
			}, 1);
	}
	function dragStartHandler(e) {
		e.dataTransfer.setData('text/plain', file.path);
	}
	function dragOverHandler(e) {
		if (file.isFolder) {
			e.preventDefault();
			e.currentTarget.classList.add('is-being-dragged-over');
			e.currentTarget.style.outline = '1px dashed';
		}
	}
	function dragLeaveHandler(e) {
		if (file.isFolder) {
			e.preventDefault();
			e.currentTarget.style.outline = null;
		}
	}
	function dropHandler(e) {
		if (file.isFolder) {
			e.preventDefault();
			onFileDrop(e.dataTransfer.getData('text/plain'), file);
			e.currentTarget.style.outline = null;
		}
	}
	return (
		<div
			onDragOver={dragOverHandler}
			onDragLeave={dragLeaveHandler}
			onDrop={dropHandler}
		>
			{file === fileBeingRenamed ? (
				<input
					type="text"
					ref={focusInput}
					value={file.name}
					onBlur={onNameInputBlur}
					onKeyUp={onNameInputKeyUp}
				/>
			) : (
				<button
					class={`sidebar__file  ${selectedFile === file ? 'selected' : ''}`}
					type="button"
					draggable={file.name !== 'index.html'}
					onDragStart={dragStartHandler}
					onClick={onFileSelect.bind(null, file)}
				>
					<div class="flex flex-v-center">
						<FileIcon file={file} />
						{file.name}
					</div>
					<div class="sidebar__file-options">
						<button
							type="button"
							class="btn btn--dark"
							onClick={onRenameBtnClick.bind(null, file)}
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
							onClick={onRemoveBtnClick.bind(null, file)}
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
	);
}
function Folder(props) {
	return (
		<div>
			<File {...props} file={props.file} />
			<div class="sidebar__folder-wrap" data-collapsed={props.file.isCollapsed}>
				{props.file.children.map(
					childFile =>
						childFile.isFolder ? (
							<Folder {...props} file={childFile} />
						) : (
							<File {...props} file={childFile} />
						)
				)}
			</div>
		</div>
	);
}

export class SidePane extends Component {
	addFileButtonClickHandler() {
		this.setState({ isAddingFile: true });
	}
	addFolderButtonClickHandler() {
		this.setState({ isAddingFolder: true });
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

	addFile(e) {
		// This gets called twice when enter is pressed, because blur also fires.
		// So check `isAddingFile` before proceeding.
		if (!this.state.isAddingFile && !this.state.isAddingFolder) {
			return;
		}
		const newFileName = e.target.value;
		if (!this.warnForExistingFileName(newFileName)) {
			return;
		}
		if (newFileName) {
			this.props.onAddFile(newFileName, this.state.isAddingFolder);
		}
		this.setState({ isAddingFile: false, isAddingFolder: false });
	}
	newFileNameInputKeyDownHandler(e) {
		if (e.which === ENTER_KEY) {
			this.addFile(e);
		} else if (e.which === ESCAPE_KEY) {
			this.setState({ isAddingFile: false, isAddingFolder: false });
		}
	}
	removeFileClickHandler(file, e) {
		e.stopPropagation();
		const answer = confirm(`Are you sure you want to delete "${file.name}"?`);
		if (answer) {
			this.props.onRemoveFile(file.path);
		}
	}
	renameFile(e) {
		// This gets called twice when enter is pressed, because blur also fires.
		if (!e.target || !this.state.fileBeingRenamed) {
			return;
		}
		const newFileName = e.target.value;
		if (!this.warnForExistingFileName(newFileName)) {
			return;
		}
		if (newFileName) {
			this.props.onRenameFile(this.state.fileBeingRenamed.path, newFileName);
		}
		this.setState({ fileBeingRenamed: null });
	}
	renameFileNameInputKeyUpHandler(e) {
		if (e.which === ENTER_KEY) {
			this.renameFile(e);
		} else if (e.which === ESCAPE_KEY) {
			this.setState({ fileBeingRenamed: null });
		}
	}
	renameFileClickHandler(file, e) {
		e.stopPropagation();
		this.setState({
			fileBeingRenamed: file
		});
	}
	render() {
		const { files, onFileSelect, selectedFile, onRemoveFile } = this.props;
		const moreProps = {
			onRemoveBtnClick: this.removeFileClickHandler.bind(this),
			onRenameBtnClick: this.renameFileClickHandler.bind(this),
			onNameInputBlur: this.renameFile.bind(this),
			onNameInputKeyUp: this.renameFileNameInputKeyUpHandler.bind(this),
			fileBeingRenamed: this.state.fileBeingRenamed
		};

		return (
			<div class="sidebar">
				<div class="flex jc-sb" style="padding: 5px 4px">
					Files
					<div class="flex flex-v-center">
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
						<button
							type="button"
							class="btn--dark"
							onClick={this.addFolderButtonClickHandler.bind(this)}
						>
							<svg
								viewBox="0 0 24 24"
								style="vertical-align:middle;width:14px;height:14px"
							>
								<path d="M10,4L12,6H20A2,2 0 0,1 22,8V18A2,2 0 0,1 20,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,4 4,4H10M15,9V12H12V14H15V17H17V14H20V12H17V9H15Z" />
							</svg>
						</button>
					</div>
				</div>
				{this.state.isAddingFile || this.state.isAddingFolder ? (
					<div>
						<input
							type="text"
							ref={el => {
								el &&
									setTimeout(() => {
										el.focus();
									}, 1);
							}}
							onBlur={this.addFile.bind(this)}
							onKeyUp={this.newFileNameInputKeyDownHandler.bind(this)}
						/>
					</div>
				) : null}
				{files.map(
					file =>
						file.isFolder ? (
							<Folder {...this.props} {...moreProps} file={file} />
						) : (
							<File {...this.props} {...moreProps} file={file} />
						)
				)}
			</div>
		);
	}
}
