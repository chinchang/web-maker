import { h, Component } from 'preact';
import { FileIcon } from './FileIcon';
import { getParentPath, getFileFromPath } from '../fileUtils';
import { trackEvent } from '../analytics';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

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
			// e.stopPropagation();
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
		e.stopPropagation();
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
					<div class="flex flex-v-center ov-h">
						<FileIcon file={file} />
						<div class="sidebar__file-name">{file.name}</div>
					</div>
					<div class="sidebar__file-options">
						<button
							type="button"
							class="btn btn--dark btn--chromeless"
							onClick={onRenameBtnClick.bind(null, file)}
						>
							<svg viewBox="0 0 24 24">
								<path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
							</svg>
						</button>

						<button
							type="button"
							class="btn btn--dark btn--chromeless"
							onClick={onRemoveBtnClick.bind(null, file)}
						>
							<svg viewBox="0 0 24 24">
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
				{props.file.children.map(childFile =>
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
		trackEvent('ui', 'fileAddBtnClick');
	}
	addFolderButtonClickHandler() {
		this.setState({ isAddingFolder: true });
		trackEvent('ui', 'folderAddBtnClick');
	}
	/**
	 * Checks if the passed filename already exists and if so, warns the user.
	 * Also it passes false if the validation fails.
	 * @param {string} newFileName New file name to validate
	 */
	warnForExistingFileName(newFileName) {
		// We also check for fileBeingRenamed !== file because when a file being renamed is
		// asked to be set as same name, then that should not match and warn here.
		let newPath = this.state.fileBeingRenamed
			? `${getParentPath(this.state.fileBeingRenamed.path)}/${newFileName}`
			: newFileName;
		// remove first slash
		newPath = newPath.replace(/^\//, '');
		const match = getFileFromPath(this.props.files, newPath);

		if (match.file && this.state.fileBeingRenamed !== match.file) {
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
		trackEvent('ui', 'fileRemoveBtnClick');
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
		trackEvent('ui', 'fileRenameBtnClick');
	}

	dragOverHandler(e) {
		e.preventDefault();
	}
	dropHandler(e) {
		e.preventDefault();
		// Object with `children` key is to simulate a folder structure for root folder
		this.props.onFileDrop(e.dataTransfer.getData('text/plain'), {
			children: this.props.files
		});
		// e.currentTarget.style.outline = null;
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
			<div
				class="sidebar"
				onDragOver={this.dragOverHandler.bind(this)}
				onDrop={this.dropHandler.bind(this)}
			>
				<div class="d-f jc-sb ai-c" style="padding: 5px 10px">
					Files
					<div class="flex ai-c">
						<button
							type="button"
							class="btn btn--dark"
							onClick={this.addFileButtonClickHandler.bind(this)}
						>
							<svg viewBox="0 0 24 24">
								<path d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M11,15V12H9V15H6V17H9V20H11V17H14V15H11Z" />
							</svg>
						</button>
						<button
							type="button"
							class="btn btn--dark"
							onClick={this.addFolderButtonClickHandler.bind(this)}
						>
							<svg viewBox="0 0 24 24">
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
				{files.map(file =>
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
