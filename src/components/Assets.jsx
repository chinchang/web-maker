import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import { HStack, Stack, VStack } from './Stack';
import { copyToClipboard } from '../utils';
import { Trans } from '@lingui/macro';
import { ProBadge } from './ProBadge';
import { LoaderWithText } from './Loader';
import { Text } from './Text';

const Assets = () => {
	const [files, setFiles] = useState([]);
	const [isFetchingFiles, setIsFetchingFiles] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredFiles, setFilteredFiles] = useState([]);
	const [isUploading, setIsUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState();
	const [listType, setListType] = useState('grid');

	const storageRef = firebase.storage().ref(`assets/${window.user?.uid}`);

	const uploadFile = file => {
		if (file.size > 300 * 1024) {
			// 5MB limit
			alert('File size must be less than 300KB');
			return;
		}

		setIsUploading(true);
		const metadata = {
			cacheControl: 'public, max-age=3600' // 1 hr
		};

		const fileRef = storageRef.child(file.name);
		const task = fileRef.put(file, metadata);

		task.on(
			'state_changed',
			snapshot => {
				// Observe state change events such as progress, pause, and resume
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log('Upload is ' + progress + '% done');
			},
			error => {
				// Handle unsuccessful uploads
				setIsUploading(false);
				console.error('File upload error:', error);
			},
			() => {
				// uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
				//   console.log('File available at', downloadURL);
				// });

				alertsService.add('File uploaded successfully');

				fetchFiles();
				setIsUploading(false);
			}
		);
	};
	// Function to handle file upload
	const handleFileUpload = e => {
		const file = e.target.files[0];
		uploadFile(file);
	};

	// Function to fetch existing files
	const fetchFiles = () => {
		setIsFetchingFiles(true);
		storageRef
			.listAll()
			.then(result => {
				const filePromises = result.items.map(item => {
					return item.getDownloadURL().then(url => {
						return { name: item.name, url };
					});
				});

				Promise.all(filePromises).then(setFiles);
				setIsFetchingFiles(false);
			})
			.catch(error => {
				console.error('File fetch error:', error);
				setIsFetchingFiles(false);
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
		if (e.type === 'dragover') {
			// required for drop to work
			e.preventDefault();
		} else if (e.type === 'dragleave') {
			e.preventDefault();
			// so that individual nested elements don't trigger dragleave
			if (e.currentTarget.contains(e.target)) return;
			setIsDropTarget(false);
		} else if (e.type === 'dragenter') {
			setIsDropTarget(true);
		}
	};

	const handleDrop = e => {
		e.preventDefault();
		console.log('drop');
		setIsDropTarget(false);

		if (e.dataTransfer.items) {
			const file = e.dataTransfer.items[0].getAsFile();
			uploadFile(file);
		}
	};

	const copyFileUrl = url => {
		copyToClipboard(url).then(() => {
			alertsService.add('File URL copied!');
		});
	};

	if (!window.user?.isPro) {
		return (
			<VStack align="stretch" gap={2}>
				<p>Assets feature is available in PRO plan.</p>
				<button class="btn  btn--primary ">
					<HStack gap={1} fullWidth justify="center">
						Upgrade to <ProBadge />
					</HStack>
				</button>
			</VStack>
		);
	}
	return (
		<div
			onDragEnter={handleDragDropEvent}
			onDragLeave={handleDragDropEvent}
			onDragOver={handleDragDropEvent}
			onDrop={handleDrop}
		>
			<HStack gap={1} align="center">
				<h1>
					<Trans>Assets</Trans>
				</h1>
				<ProBadge />
			</HStack>

			<div
				class="asset-manager__upload-box"
				style={{
					background: isDropTarget ? '#19a61940' : 'transparent',
					borderColor: isDropTarget ? 'limegreen' : null
				}}
			>
				{isUploading ? <div class="asset-manager__progress-bar"></div> : null}

				<div style={{ visibility: isUploading ? 'hidden' : 'visible' }}>
					<VStack gap={1} align="stretch">
						<label style="background: #00000001">
							<Text tag="p" align="center">
								Drop files or click here to upload
							</Text>
							<Text tag="p" appearance="secondary" align="center">
								File should be max 300KB in size
							</Text>
							<input
								type="file"
								onChange={handleFileUpload}
								style={{ marginTop: 'auto', display: 'none' }}
							/>
						</label>
					</VStack>
				</div>
			</div>
			{isFetchingFiles && <LoaderWithText>Fetching files...</LoaderWithText>}
			<VStack align="stretch" gap={1}>
				{files.length ? (
					<Stack gap={1}>
						<input
							type="text"
							placeholder="Search files"
							value={searchTerm}
							onChange={handleSearchChange}
							style={{ width: '100%' }}
						/>
						<button
							class={`btn btn--dark ${
								listType === 'list' ? 'btn--active' : ''
							}  hint--rounded hint--top-left`}
							onClick={() => setListType('list')}
							aria-label="List view"
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<title>view-list</title>
								<path d="M9,5V9H21V5M9,19H21V15H9M9,14H21V10H9M4,9H8V5H4M4,19H8V15H4M4,14H8V10H4V14Z" />
							</svg>
						</button>
						<button
							class={`btn btn--dark ${
								listType === 'grid' ? 'btn--active' : ''
							}  hint--rounded hint--top-left`}
							onClick={() => setListType('grid')}
							aria-label="Grid view"
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path d="M3 11h8V3H3m0 18h8v-8H3m10 8h8v-8h-8m0-10v8h8V3" />
							</svg>
						</button>
					</Stack>
				) : null}
				<div
					class={`asset-manager__file-container ${
						listType === 'grid' ? 'asset-manager__file-container--grid' : ''
					}`}
				>
					{filteredFiles.map((file, index) => (
						<button
							type="button"
							key={index}
							onClick={() => copyFileUrl(file.url)}
							class={`asset-manager__file ${
								listType === 'grid' ? 'asset-manager__file--grid' : ''
							}`}
						>
							{/* <a href={file.url} target="_blank" rel="noopener noreferrer"> */}
							<img src={file.url} />{' '}
							<span class="asset-manager__file-name">{file.name}</span>
							{/* </a> */}
						</button>
					))}
				</div>
			</VStack>
		</div>
	);
};

export { Assets };
