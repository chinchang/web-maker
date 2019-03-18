/**
 * Returns the extension from the file name.
 * @param {dtring} fileName File name
 */
export function getExtensionFromFileName(fileName) {
	const type = fileName.match(/\.(\w+)$/);
	return type ? type[1] : '';
}

/**
 * Returns a linear file list from a nested file strcuture.
 * It excludes the folders from the returned list.
 * @param {array} files Nested file structure
 */
export function linearizeFiles(files) {
	function reduceToLinearFiles(_files) {
		return _files.reduce((list, currentFile) => {
			if (currentFile.isFolder) {
				return [...list, ...reduceToLinearFiles(currentFile.children)];
			}
			return [...list, currentFile];
		}, []);
	}
	return reduceToLinearFiles(files);
}

/**
 * Recursively iterates and assigns the `path` property to the files in passed files
 * array.
 * @param {array} files files structure for an item
 * @param {string} parentPath Parent path to prefix with all processed files
 */
export function assignFilePaths(files, parentPath = '') {
	files.forEach(file => {
		file.path = parentPath ? `${parentPath}/${file.name}` : file.name;
		if (file.isFolder) {
			assignFilePaths(
				file.children,
				parentPath ? `${parentPath}/${file.name}` : file.name
			);
		}
	});
	return files;
}

/**
 * Returns the file object and it's index that is direct child of passed files array with name as passed fileName.
 * If not found, returns -1
 * @param {array} files files structure for an item
 * @param {string} fileName File/folder name
 */
export function getChildFileFromName(files, fileName) {
	const index = files.findIndex(file => file.name === fileName);
	return { index, file: files[index] };
}

/**
 * Returns the file object and it's index in its parent for the passed path.
 * If not found, returns {index:-1}
 * @param {array} files files structure for an item
 * @param {string} path Path of file to search
 */
export function getFileFromPath(files, path) {
	let currentFolder = files;
	const pathPieces = path.split('/');
	while (pathPieces.length > 1) {
		const folderName = pathPieces.shift();
		currentFolder = getChildFileFromName(currentFolder, folderName).file
			.children;
	}
	// now we should be left with just one value in the pathPieces array - the actual file name
	return getChildFileFromName(currentFolder, pathPieces[0]);
}

/**
 * Returns the file object and it's index in its parent for the passed path.
 * If not found, returns {index:-1}
 * @param {array} files files structure for an item
 * @param {string} path Path of file to search
 */
export function removeFileAtPath(files, path) {
	let currentFolder = files;
	const pathPieces = path.split('/');
	while (pathPieces.length > 1) {
		const folderName = pathPieces.shift();
		currentFolder = getChildFileFromName(currentFolder, folderName).file
			.children;
	}
	// now we should be left with just one value in the pathPieces array - the actual file name
	const { index } = getChildFileFromName(currentFolder, pathPieces[0]);
	currentFolder.splice(index, 1);
}

/**
 * Checks if a file with same name exists in the passed folder.
 * @param {object} folder Folder to search in
 * @param {string} fileName File name to search for
 */
export function doesFileExistInFolder(folder, fileName) {
	const details = getChildFileFromName(folder.children, fileName);
	return !!details.file;
}

/**
 * Returns parent path of passed path
 * @param {string} path Path of file to find parent of
 */
export function getParentPath(path) {
	const pathPieces = path.split('/');
	if (pathPieces.length > 1) {
		return pathPieces.slice(0, -1).join('/');
	}
	return '';
}

/**
 * Fetches the files from a github repo and returns a suitable file structure.
 * @param {Promise} Promise of completition. Resolves to the files structure.
 */
export function importGithubRepo(repoUrl) {
	let repoSlug, match;
	if ((match = repoUrl.match(/github\.com\/([^/]*\/[^/]*)/))) {
		repoSlug = match[1];
	} else {
		repoSlug = 'chinchang/github';
	}
	const queryString = '';
	function fetchFile(filepath) {
		return fetch(
			`https://api.github.com/repos/${repoSlug}/contents/${filepath}${queryString}`
		).then(response => response.json());
	}
	function fetchDir(path, currentDir) {
		return fetch(
			`https://api.github.com/repos/${repoSlug}/contents/${path}${queryString}`
		)
			.then(response => response.json())
			.then(response => {
				if (!response) {
					return Promise.resolve([]);
				}
				return Promise.all(
					response.map(file => {
						if (file.type === 'file') {
							return fetchFile(`${file.path}`).then(actualFile => {
								currentDir.push({
									name: file.name,
									content: atob(actualFile.content)
								});
							});
						} else if (file.type === 'dir') {
							const newEntry = {
								name: file.name,
								children: [],
								isFolder: true
							};
							currentDir.push(newEntry);
							return fetchDir(`${file.path}`, newEntry.children);
						}
						return Promise.resolve();
					})
				);
			});
	}
	const files = [];
	return fetchDir('', files).then(() => {
		return files;
	});
}
