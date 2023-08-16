import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';

const Assets = () => {
	const [files, setFiles] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredFiles, setFilteredFiles] = useState([]);
	const storageRef = firebase.storage().ref(`assets/${window.user.uid}`);

	// Function to handle file upload
	const handleFileUpload = e => {
		const file = e.target.files[0];

		if (file.size > 5 * 1024 * 1024) {
			// 5MB limit
			alert('File size must be less than 5MB');
			return;
		}

		const fileRef = storageRef.child(file.name);
		fileRef
			.put(file)
			.then(() => {
				alert('File uploaded successfully');
				fetchFiles();
			})
			.catch(error => {
				console.error('File upload error:', error);
			});
	};

	// Function to fetch existing files
	const fetchFiles = () => {
		storageRef
			.listAll()
			.then(result => {
				const filePromises = result.items.map(item => {
					return item.getDownloadURL().then(url => {
						return { name: item.name, url };
					});
				});

				Promise.all(filePromises).then(setFiles);
			})
			.catch(error => {
				console.error('File fetch error:', error);
			});
	};

	// Function to handle search input change
	const handleSearchChange = e => {
		const term = e.target.value;
		setSearchTerm(term);
	};

	useEffect(() => {
		fetchFiles();
	}, []);

	useEffect(() => {
		if (searchTerm) {
			setFilteredFiles(
				files.filter(file =>
					file.name.toLowerCase().includes(searchTerm.toLowerCase())
				)
			);
		} else {
			setFilteredFiles(files);
		}
	}, [files, searchTerm]);

	const [isDropTarget, setIsDropTarget] = useState(false);
	const handleDragDropEvent = e => {
		console.log('drag event, ', e.type);
		if (e.type === 'dragleave' || e.type === 'drop') {
			setIsDropTarget(false);
		}
		if (e.type === 'dragenter') {
			setIsDropTarget(true);
			ode;
			console.log(999, e.type);
		}
	};

	return (
		<div>
			<div
				class="asset_manager__upload-box"
				style={{
					background: isDropTarget ? '#19a61940' : 'transparent',
					borderColor: isDropTarget ? 'limegreen' : null
				}}
				onDragEnter={handleDragDropEvent}
				onDragOver={handleDragDropEvent}
				onDrop={e => {
					handleDragDropEvent(e);
					// setFiles(e, 'a');
				}}
			>
				<p>Drop file here to upload</p>
				<input
					type="file"
					onChange={handleFileUpload}
					style={{ marginTop: 'auto' }}
				/>
			</div>
			{files.length ? (
				<input
					type="text"
					placeholder="Search files"
					value={searchTerm}
					onChange={handleSearchChange}
					style={{ width: '100%' }}
				/>
			) : null}
			<ul>
				{filteredFiles.map((file, index) => (
					<li key={index}>
						<a href={file.url} target="_blank" rel="noopener noreferrer">
							<img src={file.url} height="20" /> {file.name}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export { Assets };
