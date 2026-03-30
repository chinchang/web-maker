import React, { useState, useEffect, useCallback } from 'react';
import {
	deleteObject,
	uploadBytesResumable,
	ref,
	listAll,
	getDownloadURL
} from 'firebase/storage';
import { storage } from '../firebaseInit';
import { HStack, Stack, VStack } from './Stack';
import { copyToClipboard } from '../utils';
import { Trans, t } from '@lingui/macro';
import { I18n } from '@lingui/react';
import { ProBadge } from './ProBadge';
import { LoaderWithText } from './Loader';
import { Text } from './Text';
import { Icon } from './Icons';
import Tabs, { TabPanel } from './Tabs';
import {
	getAllAssets,
	addAsset,
	removeAsset,
	LOCAL_ASSET_PREFIX
} from '../localAssetService';
import { trackEvent } from '../analytics';

function getFileExtType(name) {
	const ext = name.split('.').pop().toLowerCase();
	if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext)) {
		return 'image';
	}
	return ext;
}

function getFileType(url) {
	const ext = new URL(url).pathname.split('.').pop();
	if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(ext)) {
		return 'image';
	}
	return ext;
}

// --- Shared hooks ---

function useDragDrop(onFileDrop) {
	const [isDropTarget, setIsDropTarget] = useState(false);

	const handleDragDropEvent = useCallback(e => {
		if (e.type === 'dragover') {
			e.preventDefault();
		} else if (e.type === 'dragleave') {
			e.preventDefault();
			if (e.currentTarget.contains(e.target)) return;
			setIsDropTarget(false);
		} else if (e.type === 'dragenter') {
			setIsDropTarget(true);
		}
	}, []);

	const handleDrop = useCallback(
		e => {
			e.preventDefault();
			setIsDropTarget(false);
			if (e.dataTransfer.items) {
				const file = e.dataTransfer.items[0].getAsFile();
				if (file) onFileDrop(file);
			}
		},
		[onFileDrop]
	);

	const dragProps = {
		onDragEnter: handleDragDropEvent,
		onDragLeave: handleDragDropEvent,
		onDragOver: handleDragDropEvent,
		onDrop: handleDrop
	};

	return { isDropTarget, dragProps };
}

function useCopyUrl() {
	const [lastCopied, setLastCopied] = useState({ name: '', count: 0 });

	const copyUrl = useCallback(
		url => {
			let copyContent = url;
			if (lastCopied.name === url) {
				lastCopied.count = (lastCopied.count + 1) % 3;
			} else {
				lastCopied.count = 0;
				lastCopied.name = url;
			}

			switch (lastCopied.count) {
				case 0:
					copyContent = url;
					break;
				case 1:
					copyContent = `<img src="${url}" />`;
					break;
				case 2:
					copyContent = `url("${url}")`;
					break;
			}
			setLastCopied({ ...lastCopied });

			copyToClipboard(copyContent).then(() => {
				const msgs = [
					'URL copied',
					'URL copied as <IMG> tag',
					'URL copied as CSS image URL'
				];
				alertsService.add(msgs[lastCopied.count]);
				trackEvent('ui', 'assetUrlCopied');
			});
		},
		[lastCopied]
	);

	return copyUrl;
}

// --- Shared components ---

const UploadBox = ({
	isDropTarget,
	isUploading,
	onFileChange,
	label,
	sizeHint
}) => (
	<div
		class="asset-manager__upload-box"
		style={{
			background: isDropTarget ? '#19a61940' : 'transparent',
			borderColor: isDropTarget ? 'limegreen' : null
		}}
	>
		{isUploading ? <div class="asset-manager__progress-bar"></div> : null}

		<div style={{ visibility: isUploading ? 'hidden' : 'visible' }}>
			<label style="background: #00000001">
				<Text tag="p" align="center">
					{label}
				</Text>
				<Text tag="p" appearance="secondary" align="center">
					{sizeHint}
				</Text>
				<input
					type="file"
					onChange={onFileChange}
					style={{ display: 'none' }}
				/>
			</label>
		</div>
	</div>
);

const FileGrid = ({ files, listType, onCopy, onDelete, i18n }) => (
	<div
		class={`asset-manager__file-container ${
			listType === 'grid' ? 'asset-manager__file-container--grid' : ''
		}`}
	>
		{files.map((file, index) => (
			<div
				key={file.name || index}
				class={`asset-manager__file ${
					listType === 'grid' ? 'asset-manager__file--grid' : ''
				}`}
			>
				{file.ext === 'image' ? (
					<img
						src={file.thumbUrl || file.url}
						class="asset-manager__file-image"
					/>
				) : (
					<div
						style={{ position: 'relative', display: 'flex' }}
						class="asset-manager__file-image"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="#ffffff33"
							viewBox="0 0 24 24"
						>
							<path d="M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z" />
						</svg>
						<span className="asset-manager__file-ext">{file.ext}</span>
					</div>
				)}
				<div class="asset-manager__file-actions">
					<Stack gap={1} fullWidth justify="center">
						<button
							class="btn btn--dark hint--rounded hint--top hint--medium"
							onClick={() => onCopy(file)}
							aria-label={i18n._(
								t`Copy URL (or keep clicking to copy other formats)`
							)}
						>
							<Icon name="copy" />
						</button>
						<button
							class="btn btn--dark hint--rounded hint--top-left"
							onClick={() => onDelete(file, index)}
							aria-label={i18n._(t`Delete`)}
						>
							<Icon name="trash" />
						</button>
					</Stack>
				</div>
				<span class="asset-manager__file-name">{file.name}</span>
			</div>
		))}
	</div>
);

const SearchAndViewToolbar = ({
	searchTerm,
	onSearchChange,
	listType,
	setListType,
	i18n
}) => (
	<Stack gap={1}>
		<input
			type="text"
			placeholder={i18n._(t`Search files`)}
			value={searchTerm}
			onChange={onSearchChange}
			style={{ width: '100%' }}
		/>
		<button
			class={`btn btn--dark ${
				listType === 'list' ? 'btn--active' : ''
			}  hint--rounded hint--top-left`}
			onClick={() => setListType('list')}
			aria-label={i18n._(t`List view`)}
		>
			<Icon name="view-list" />
		</button>
		<button
			class={`btn btn--dark ${
				listType === 'grid' ? 'btn--active' : ''
			}  hint--rounded hint--top-left`}
			onClick={() => setListType('grid')}
			aria-label={i18n._(t`Grid view`)}
		>
			<Icon name="view-grid" />
		</button>
	</Stack>
);

// --- Tab components ---

const LocalAssets = ({ i18n }) => {
	const [localFiles, setLocalFiles] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [listType, setListType] = useState('grid');
	const copyUrl = useCopyUrl();

	useEffect(() => {
		loadLocalAssets();
	}, []);

	const loadLocalAssets = async () => {
		try {
			const assets = await getAllAssets();
			setLocalFiles(
				assets.map(a => ({
					name: a.name,
					type: a.type,
					ext: getFileExtType(a.name),
					thumbUrl: URL.createObjectURL(a.blob)
				}))
			);
		} catch (e) {
			console.error('Error loading local assets:', e);
		}
	};

	const handleLocalFileUpload = useCallback(async file => {
		try {
			await addAsset(file);
			alertsService.add('Local asset added');
			trackEvent('ui', 'localAssetAdded');
			loadLocalAssets();
		} catch (e) {
			alert(e.message);
		}
	}, []);

	const { isDropTarget, dragProps } = useDragDrop(handleLocalFileUpload);

	const handleInputChange = e => {
		const file = e.target.files[0];
		if (file) handleLocalFileUpload(file);
		e.target.value = '';
	};

	const handleCopy = file => copyUrl(`${LOCAL_ASSET_PREFIX}${file.name}`);

	const handleDelete = async file => {
		const answer = confirm(`Are you sure you want to delete "${file.name}"?`);
		if (!answer) return;
		try {
			await removeAsset(file.name);
			alertsService.add('Local asset deleted');
			trackEvent('ui', 'localAssetDeleted');
			loadLocalAssets();
		} catch (e) {
			console.error('Error removing local asset:', e);
		}
	};

	const filteredFiles = searchTerm
		? localFiles.filter(f =>
				f.name.toLowerCase().includes(searchTerm.toLowerCase())
			)
		: localFiles;

	return (
		<div {...dragProps}>
			<VStack gap={2} fullWidth align="flex-start">
				<Text tag="p" appearance="secondary" style={{ marginTop: 0 }}>
					<Trans>
						Add files locally, usable only on this browser. Won't work for
						others if you share this publicly.
					</Trans>
				</Text>

				<UploadBox
					isDropTarget={isDropTarget}
					onFileChange={handleInputChange}
					label={<Trans>Drop files or click here to add</Trans>}
					sizeHint={<Trans>Max 5MB per file</Trans>}
				/>

				{localFiles.length > 0 && (
					<VStack align="stretch" gap={1} fullWidth>
						<SearchAndViewToolbar
							searchTerm={searchTerm}
							onSearchChange={e => setSearchTerm(e.target.value)}
							listType={listType}
							setListType={setListType}
							i18n={i18n}
						/>
						<FileGrid
							files={filteredFiles}
							listType={listType}
							onCopy={handleCopy}
							onDelete={handleDelete}
							i18n={i18n}
						/>
					</VStack>
				)}
			</VStack>
		</div>
	);
};

const CloudAssets = ({ i18n, onProBtnClick, onLoginBtnClick }) => {
	const [files, setFiles] = useState([]);
	const [isFetchingFiles, setIsFetchingFiles] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [isUploading, setIsUploading] = useState(false);
	const [listType, setListType] = useState('grid');
	const copyUrl = useCopyUrl();

	useEffect(() => {
		if (window.user?.isPro) {
			fetchFiles();
		}
	}, []);

	const fetchFiles = () => {
		setIsFetchingFiles(true);
		listAll(ref(storage, `assets/${window.user?.uid}`))
			.then(result => {
				const filePromises = result.items.map(item => {
					return getDownloadURL(item).then(url => ({
						name: item.name,
						url
					}));
				});
				Promise.all(filePromises).then(files => {
					files.forEach(f => (f.ext = getFileType(f.url)));
					setFiles(files);
					setIsFetchingFiles(false);
				});
			})
			.catch(error => {
				console.error('File fetch error:', error);
				setIsFetchingFiles(false);
			});
	};

	const uploadFile = useCallback(file => {
		if (file.size > 1024 * 1024) {
			alert('File size must be less than 1MB');
			return;
		}
		setIsUploading(true);
		const task = uploadBytesResumable(
			ref(storage, `assets/${window.user?.uid}/${file.name}`),
			file,
			{ cacheControl: 'public, max-age=3600' }
		);
		task.on(
			'state_changed',
			() => {},
			() => {
				setIsUploading(false);
				alertsService.add('⚠️ File upload failed');
			},
			() => {
				alertsService.add('File uploaded successfully');
				fetchFiles();
				setIsUploading(false);
			}
		);
	}, []);

	const { isDropTarget, dragProps } = useDragDrop(uploadFile);

	const handleInputChange = e => {
		const file = e.target.files[0];
		if (file) uploadFile(file);
	};

	const handleCopy = file => copyUrl(file.url);

	const handleDelete = (file, index) => {
		const answer = confirm(`Are you sure you want to delete "${file.name}"?`);
		if (!answer) return;
		deleteObject(ref(storage, file.url))
			.then(() => {
				alertsService.add('File deleted successfully');
				setFiles(prev => prev.filter((_, i) => i !== index));
			})
			.catch(error => {
				console.error('File delete error:', error);
			});
	};

	const filteredFiles = searchTerm
		? files.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()))
		: files;

	if (!window.user?.isPro) {
		return (
			<VStack align="stretch" gap={2}>
				<p>
					<Trans>Upload assets to the cloud for use across devices.</Trans>
				</p>
				<button
					class="btn  btn--pro"
					onClick={window.user ? onProBtnClick : onLoginBtnClick}
				>
					<HStack gap={1} fullWidth justify="center">
						{window.user ? (
							<Trans>Upgrade to PRO</Trans>
						) : (
							<Trans>Login & upgrade to PRO</Trans>
						)}
					</HStack>
				</button>
			</VStack>
		);
	}

	return (
		<div {...dragProps}>
			<UploadBox
				isDropTarget={isDropTarget}
				isUploading={isUploading}
				onFileChange={handleInputChange}
				label={<Trans>Drop files or click here to upload</Trans>}
				sizeHint={<Trans>Max 300KB per file</Trans>}
			/>

			{isFetchingFiles && (
				<LoaderWithText>
					<Trans>Fetching files...</Trans>
				</LoaderWithText>
			)}

			{!isFetchingFiles && !files.length ? (
				<Stack justify="center">
					<Text align="center" appearance="secondary">
						<Trans>No files uploaded yet</Trans>
					</Text>
				</Stack>
			) : null}

			{files.length > 0 && (
				<VStack align="stretch" gap={1}>
					<SearchAndViewToolbar
						searchTerm={searchTerm}
						onSearchChange={e => setSearchTerm(e.target.value)}
						listType={listType}
						setListType={setListType}
						i18n={i18n}
					/>
					<FileGrid
						files={filteredFiles}
						listType={listType}
						onCopy={handleCopy}
						onDelete={handleDelete}
						i18n={i18n}
					/>
				</VStack>
			)}
		</div>
	);
};

// --- Main component ---

const Assets = ({ onProBtnClick, onLoginBtnClick }) => {
	return (
		<I18n>
			{({ i18n }) => (
				<div>
					<h1>
						<Trans>Assets</Trans>
					</h1>

					<Tabs>
						<TabPanel label={i18n._(t`Local`)}>
							<LocalAssets i18n={i18n} />
						</TabPanel>
						<TabPanel
							label={
								<HStack gap={2}>
									<Trans>Cloud</Trans>
									<ProBadge />
								</HStack>
							}
						>
							<CloudAssets
								i18n={i18n}
								onProBtnClick={onProBtnClick}
								onLoginBtnClick={onLoginBtnClick}
							/>
						</TabPanel>
					</Tabs>
				</div>
			)}
		</I18n>
	);
};

export { Assets };
