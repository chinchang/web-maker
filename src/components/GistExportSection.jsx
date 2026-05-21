import { useEffect, useState } from 'preact/hooks';
import { HStack, VStack } from './Stack';
import Switch from './Switch';
import { Button } from './common';
import { Icon } from './Icons';
import { Text } from './Text';
import { alertsService } from '../notifications';
import { trackEvent } from '../analytics';
import { connectGithubForGist } from '../auth';
import {
	createGist,
	updateGist,
	mapItemToGistFiles,
	getStoredGistToken,
	setStoredGistToken,
	clearStoredGistToken,
	validateGistToken
} from '../gistService';

const PAT_CREATE_URL =
	'https://github.com/settings/tokens/new?description=Web%20Maker%20Gist%20Export&scopes=gist';

export function GistExportSection({ item, onGistExported }) {
	const [token, setToken] = useState(null);
	const [tokenChecked, setTokenChecked] = useState(false);
	const [description, setDescription] = useState(
		item.title ? `${item.title} — made with Web-Maker` : 'Made with Web-Maker'
	);
	const [isPublic, setIsPublic] = useState(false);
	const [includeMeta, setIncludeMeta] = useState(false);
	const [isBusy, setIsBusy] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [gistGone, setGistGone] = useState(false);
	const [showTokenInput, setShowTokenInput] = useState(false);
	const [tokenInput, setTokenInput] = useState('');
	const [tokenError, setTokenError] = useState('');

	useEffect(() => {
		if (window.IS_EXTENSION) {
			trackEvent('ui', 'gistExportExtensionBlockedSeen');
			return;
		}
		getStoredGistToken().then(t => {
			setToken(t);
			setTokenChecked(true);
		});
	}, []);

	useEffect(() => {
		setGistGone(false);
		setErrorMsg('');
	}, [item.id, item.gistId]);

	if (window.IS_EXTENSION) {
		return (
			<VStack gap={2} align="stretch" class="gist-export">
				<h3 class="gist-export__title">
					<Icon name="github-icon" />
					<span>Export to GitHub Gist</span>
				</h3>
				<Text>
					Gist export is only available on the{' '}
					<a href="https://webmaker.app" target="_blank" rel="noopener">
						web version
					</a>{' '}
					of Web-Maker.
				</Text>
			</VStack>
		);
	}

	const handleConnect = async () => {
		setErrorMsg('');
		setIsBusy(true);
		trackEvent('ui', 'gistConnectClick');
		try {
			const newToken = await alertsService.promise(connectGithubForGist(), {
				loading: 'Connecting to GitHub…',
				success: 'GitHub connected',
				error: err =>
					err && err.code === 'POPUP_CLOSED'
						? 'Cancelled'
						: (err && err.message) || 'Could not connect to GitHub.'
			});
			await setStoredGistToken(newToken);
			setToken(newToken);
		} catch (err) {
			if (err && err.code !== 'POPUP_CLOSED') {
				setErrorMsg(err.message || 'Could not connect to GitHub.');
				trackEvent('fn', 'gistConnectFail', (err && err.code) || 'unknown');
			} else if (err && err.code === 'POPUP_CLOSED') {
				trackEvent('fn', 'gistConnectCancelled');
			}
		} finally {
			setIsBusy(false);
		}
	};

	const handleSaveToken = async () => {
		const trimmed = tokenInput.trim();
		setTokenError('');
		if (!trimmed) {
			setTokenError('Paste a token to continue.');
			return;
		}
		setIsBusy(true);
		trackEvent('ui', 'gistPatSaveClick');
		try {
			const { login } = await validateGistToken(trimmed);
			await setStoredGistToken(trimmed);
			setToken(trimmed);
			setTokenInput('');
			setShowTokenInput(false);
			alertsService.add(`Connected as ${login}`);
			trackEvent('fn', 'gistPatSaveSuccess');
		} catch (err) {
			const msg =
				err && err.code === 'INVALID_TOKEN'
					? "That token didn't work. Double-check you copied it correctly and that it hasn't expired."
					: err && err.code === 'MISSING_SCOPE'
						? 'This token is missing the "gist" scope. Recreate it on GitHub with "gist" checked.'
						: (err && err.message) || 'Could not validate token.';
			setTokenError(msg);
			trackEvent('fn', 'gistPatSaveFail', (err && err.code) || 'unknown');
		} finally {
			setIsBusy(false);
		}
	};

	const handleDisconnect = async () => {
		trackEvent('ui', 'gistDisconnectClick');
		await clearStoredGistToken();
		setToken(null);
		alertsService.add('GitHub disconnected');
	};

	const ensureFilesOrAbort = files => {
		const hasSource =
			files['index.html'] ||
			files['index.md'] ||
			files['index.pug'] ||
			Object.keys(files).some(
				k => k.startsWith('style.') || k.startsWith('script.')
			);
		if (!hasSource) {
			setErrorMsg('Add some code before exporting.');
			return false;
		}
		return true;
	};

	const formatError = err => {
		if (!err) return 'Something went wrong talking to GitHub.';
		if (err.code === 'AUTH_EXPIRED') return 'GitHub access expired';
		if (err.code === 'GIST_GONE') return 'Gist was deleted on GitHub';
		if (err.code === 'FORBIDDEN') {
			return (
				err.message ||
				"Permission denied. Make sure your token has the 'gist' scope."
			);
		}
		return err.message || 'Something went wrong talking to GitHub.';
	};

	const handleGistError = async err => {
		if (err && err.code === 'AUTH_EXPIRED') {
			await clearStoredGistToken();
			setToken(null);
			setErrorMsg('GitHub access expired. Please reconnect.');
			trackEvent('fn', 'gistAuthExpired');
		} else if (err && err.code === 'GIST_GONE') {
			setGistGone(true);
			setErrorMsg('');
		} else if (err && err.code === 'FORBIDDEN') {
			setErrorMsg(formatError(err));
		} else if (err) {
			setErrorMsg(formatError(err));
		}
	};

	const runExport = async ({ loading, success, kind, op }) => {
		setErrorMsg('');
		const files = mapItemToGistFiles(item, { includeMeta });
		if (!ensureFilesOrAbort(files)) {
			trackEvent('fn', 'gistExportEmpty', kind);
			return;
		}
		setIsBusy(true);
		try {
			const result = await alertsService.promise(op(files), {
				loading,
				success,
				error: formatError
			});
			onGistExported({ gistId: result.id, gistUrl: result.html_url });
			trackEvent('fn', 'gistExportSuccess', kind);
			if (kind !== 'update') {
				trackEvent('fn', 'gistVisibility', isPublic ? 'public' : 'secret');
			}
			trackEvent('fn', 'gistIncludeMeta', includeMeta ? '1' : '0');
		} catch (err) {
			trackEvent(
				'fn',
				'gistExportFail',
				`${kind}:${(err && err.code) || 'unknown'}`
			);
			await handleGistError(err);
		} finally {
			setIsBusy(false);
		}
	};

	const handleCreate = () => {
		trackEvent('ui', 'gistExportClick', 'create');
		return runExport({
			loading: 'Exporting to Gist…',
			success: 'Exported to Gist',
			kind: 'create',
			op: files => createGist(token, { description, isPublic, files })
		});
	};

	const handleUpdate = () => {
		trackEvent('ui', 'gistExportClick', 'update');
		return runExport({
			loading: 'Updating Gist…',
			success: 'Gist updated',
			kind: 'update',
			op: files => updateGist(token, item.gistId, { description, files })
		});
	};

	const handleExportAsNew = () => {
		trackEvent('ui', 'gistExportClick', 'new');
		return runExport({
			loading: 'Creating new Gist…',
			success: 'New gist created',
			kind: 'new',
			op: files =>
				createGist(token, { description, isPublic, files }).then(r => {
					setGistGone(false);
					return r;
				})
		});
	};

	const copyUrl = () => {
		if (!item.gistUrl) return;
		navigator.clipboard.writeText(item.gistUrl);
		alertsService.add('Gist URL copied');
		trackEvent('ui', 'gistCopyUrlClick');
	};

	if (!tokenChecked) {
		return (
			<VStack gap={2} align="stretch" class="gist-export">
				<h3 class="gist-export__title">
					<Icon name="github-icon" />
					<span>Export to GitHub Gist</span>
				</h3>
			</VStack>
		);
	}

	const hasGist = !!item.gistId;
	const showUpdateUi = hasGist && !gistGone;

	const linkedGistPill = item.gistUrl ? (
		<div class="url-pill">
			<span class="url-pill__label">Linked gist</span>
			<a
				href={item.gistUrl}
				target="_blank"
				rel="noopener"
				class="url-pill__link"
			>
				{item.gistUrl}
			</a>
			<Button
				class="btn btn--dark btn--small hint--bottom hint--rounded"
				onClick={copyUrl}
				aria-label="Copy"
			>
				<Icon name="copy" />
			</Button>
		</div>
	) : null;

	return (
		<VStack gap={2} align="stretch" class="gist-export">
			<h3 class="gist-export__title">
				<Icon name="github-icon" />
				<span>Export to GitHub Gist</span>
			</h3>

			{!token && !showTokenInput && (
				<VStack gap={2} align="stretch">
					{linkedGistPill}
					<Text>
						{item.gistUrl
							? 'Connect GitHub to update this gist or push a new version.'
							: 'Push this creation to a GitHub gist.'}{' '}
						Requires the <code>gist</code> scope.
					</Text>
					<HStack gap={2}>
						<Button
							class={`btn btn--primary ${isBusy ? 'is-loading' : ''}`}
							disabled={isBusy}
							onClick={handleConnect}
						>
							Connect GitHub
						</Button>
					</HStack>
					<Text class="gist-export__hint">
						Can't connect?{' '}
						<button
							type="button"
							class="gist-export__linkbtn"
							onClick={() => {
								setTokenError('');
								setShowTokenInput(true);
								trackEvent('ui', 'gistPatToggleOpen');
							}}
						>
							Use a personal access token instead
						</button>
					</Text>
				</VStack>
			)}

			{!token && showTokenInput && (
				<VStack gap={2} align="stretch" class="gist-export__pat">
					{linkedGistPill}
					<Text>
						Paste a GitHub personal access token with the <code>gist</code>{' '}
						scope. It's stored only on this device.
					</Text>
					<ol class="gist-export__steps">
						<li>
							<a
								href={PAT_CREATE_URL}
								target="_blank"
								rel="noopener"
								onClick={() => trackEvent('ui', 'gistPatCreateLinkClick')}
							>
								Open GitHub's "New token" page
							</a>{' '}
							(the <code>gist</code> scope is pre-selected).
						</li>
						<li>
							Pick an expiration, scroll down, and click{' '}
							<strong>Generate token</strong>.
						</li>
						<li>Copy the token and paste it below.</li>
					</ol>
					<label class="gist-export__row">
						<span>Personal access token</span>
						<input
							type="password"
							class="gist-export__input"
							placeholder="ghp_… or github_pat_…"
							value={tokenInput}
							autoFocus
							onInput={e => {
								setTokenInput(e.target.value);
								if (tokenError) setTokenError('');
							}}
							onKeyDown={e => {
								if (e.key === 'Enter' && !isBusy) handleSaveToken();
							}}
						/>
					</label>
					{tokenError && (
						<p class="gist-export__error" role="alert">
							{tokenError}
						</p>
					)}
					<HStack gap={2}>
						<Button
							class={`btn btn--primary ${isBusy ? 'is-loading' : ''}`}
							disabled={isBusy || !tokenInput.trim()}
							onClick={handleSaveToken}
						>
							Save token
						</Button>
						<button
							type="button"
							class="gist-export__linkbtn"
							disabled={isBusy}
							onClick={() => {
								setShowTokenInput(false);
								setTokenInput('');
								setTokenError('');
								trackEvent('ui', 'gistPatToggleClose');
							}}
						>
							Back
						</button>
					</HStack>
				</VStack>
			)}

			{token && (
				<VStack gap={3} align="stretch">
					{showUpdateUi && linkedGistPill}

					{gistGone && (
						<Text>
							This gist was deleted on GitHub. Create a new one to re-link.
						</Text>
					)}

					<label class="gist-export__row">
						<span>Description</span>
						<input
							type="text"
							class="gist-export__input"
							value={description}
							onInput={e => setDescription(e.target.value)}
						/>
					</label>

					{!showUpdateUi && (
						<Switch
							checked={isPublic}
							onChange={e => setIsPublic(e.target.checked)}
							labels={['Secret', 'Public']}
						>
							Visibility
						</Switch>
					)}

					<Switch
						checked={includeMeta}
						onChange={e => setIncludeMeta(e.target.checked)}
						labels={['No', 'Yes']}
					>
						Include README.md and webmaker.json
					</Switch>

					<HStack gap={2} class="gist-export__actions">
						{showUpdateUi ? (
							<Button
								class={`btn btn--primary ${isBusy ? 'is-loading' : ''}`}
								disabled={isBusy}
								onClick={handleUpdate}
							>
								Update Gist
							</Button>
						) : gistGone ? (
							<Button
								class={`btn btn--primary ${isBusy ? 'is-loading' : ''}`}
								disabled={isBusy}
								onClick={handleExportAsNew}
							>
								Create new Gist
							</Button>
						) : (
							<Button
								class={`btn btn--primary ${isBusy ? 'is-loading' : ''}`}
								disabled={isBusy}
								onClick={handleCreate}
							>
								Export to Gist
							</Button>
						)}

						{showUpdateUi && (
							<Button
								class={`btn btn--dark ${isBusy ? 'is-loading' : ''}`}
								disabled={isBusy}
								onClick={handleExportAsNew}
							>
								Export as new gist
							</Button>
						)}

						<button
							type="button"
							class="gist-export__disconnect"
							disabled={isBusy}
							onClick={handleDisconnect}
						>
							Disconnect GitHub
						</button>
					</HStack>
				</VStack>
			)}

			{errorMsg && <p class="gist-export__error">{errorMsg}</p>}
		</VStack>
	);
}
