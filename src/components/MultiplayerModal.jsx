import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Modal from './Modal.jsx';
import { Trans, t } from '@lingui/macro';
import { I18n } from '@lingui/react';
import { trackEvent } from '../analytics';

/**
 * MultiplayerModal - Modal for managing multiplayer/collaborative editing sessions
 *
 * Props:
 * - show: boolean - Whether to show the modal
 * - closeHandler: function - Called when modal should close
 * - multiplayerSession: object - Current session data (null if not in session)
 * - participants: array - List of participants with {clientId, name, color, isLocal}
 * - connectionStatus: string - 'connected' | 'connecting' | 'disconnected' | 'error'
 * - onStartSession: function - Called when user wants to start a new session
 * - onLeaveSession: function - Called when user wants to leave current session
 */
export default function MultiplayerModal({
	show,
	closeHandler,
	multiplayerSession,
	participants = [],
	connectionStatus = 'disconnected',
	onStartSession,
	onLeaveSession
}) {
	const [copySuccess, setCopySuccess] = useState(false);

	useEffect(() => {
		if (copySuccess) {
			const timer = setTimeout(() => setCopySuccess(false), 2000);
			return () => clearTimeout(timer);
		}
	}, [copySuccess]);

	const handleCopyLink = () => {
		if (multiplayerSession?.url) {
			navigator.clipboard.writeText(multiplayerSession.url);
			setCopySuccess(true);
			trackEvent('ui', 'multiplayerCopyLink');
		}
	};

	const handleStartSession = () => {
		onStartSession();
		trackEvent('ui', 'multiplayerStartSession');
	};

	const handleLeaveSession = () => {
		onLeaveSession();
		trackEvent('ui', 'multiplayerLeaveSession');
	};

	const getConnectionStatusLabel = status => {
		switch (status) {
			case 'connected':
				return 'Connected';
			case 'connecting':
				return 'Connecting...';
			case 'disconnected':
				return 'Disconnected';
			case 'error':
				return 'Connection Error';
			default:
				return 'Unknown';
		}
	};

	const isInSession = !!multiplayerSession;

	return (
		<I18n>
			{({ i18n }) => (
				<Modal show={show} closeHandler={closeHandler}>
					<div class="multiplayer-modal">
						<h1 class="multiplayer-modal__title">
							<svg
								viewBox="0 0 24 24"
								width="24"
								height="24"
								style="margin-right: 8px; vertical-align: middle;"
							>
								<path
									fill="currentColor"
									d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
								/>
							</svg>
							<Trans>Multiplayer Mode</Trans>
						</h1>

						{!isInSession ? (
							<div class="multiplayer-modal__section">
								<p class="multiplayer-modal__description">
									<Trans>
										Start a collaborative editing session and invite others to
										code together in real-time. Everyone can see each other's
										cursors and edits.
									</Trans>
								</p>

								<button
									class="btn btn--primary multiplayer-modal__start-btn"
									onClick={handleStartSession}
								>
									<svg viewBox="0 0 24 24" width="18" height="18">
										<path
											fill="currentColor"
											d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
										/>
									</svg>
									<Trans>Start New Session</Trans>
								</button>
							</div>
						) : (
							<>
								<div class="multiplayer-modal__section">
									<div class="multiplayer-modal__status-row">
										<span
											class="multiplayer-modal__status-dot"
											data-status={connectionStatus}
										/>
										<span class="multiplayer-modal__status-label">
											{getConnectionStatusLabel(connectionStatus)}
										</span>
									</div>
								</div>

								<div class="multiplayer-modal__section">
									<h3 class="multiplayer-modal__section-title">
										<Trans>Share Link</Trans>
									</h3>
									<div class="multiplayer-modal__link-row">
										<input
											type="text"
											class="multiplayer-modal__link-input"
											value={multiplayerSession?.url || ''}
											readOnly
											onClick={e => e.target.select()}
										/>
										<button
											class={`btn multiplayer-modal__copy-btn ${
												copySuccess ? 'is-success' : ''
											}`}
											onClick={handleCopyLink}
											title={i18n._(t`Copy link`)}
										>
											{copySuccess ? (
												<svg viewBox="0 0 24 24" width="18" height="18">
													<path
														fill="currentColor"
														d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
													/>
												</svg>
											) : (
												<svg viewBox="0 0 24 24" width="18" height="18">
													<path
														fill="currentColor"
														d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
													/>
												</svg>
											)}
										</button>
									</div>
									<p class="multiplayer-modal__hint">
										<Trans>
											Share this link with others to let them join your session.
										</Trans>
									</p>
								</div>

								<div class="multiplayer-modal__section">
									<h3 class="multiplayer-modal__section-title">
										<Trans>Participants</Trans> ({participants.length})
									</h3>
									<div class="multiplayer-modal__participants">
										{participants.map(participant => (
											<div
												key={participant.clientId}
												class="multiplayer-modal__participant"
											>
												<span
													class="multiplayer-modal__participant-avatar"
													style={{ backgroundColor: participant.color }}
												>
													{participant.name.charAt(0).toUpperCase()}
												</span>
												<span class="multiplayer-modal__participant-name">
													{participant.name}
													{participant.isLocal && (
														<span class="multiplayer-modal__you-label">
															{' '}
															(You)
														</span>
													)}
												</span>
											</div>
										))}
									</div>
								</div>

								<div class="multiplayer-modal__section multiplayer-modal__actions">
									<button
										class="btn btn--secondary multiplayer-modal__leave-btn"
										onClick={handleLeaveSession}
									>
										<svg viewBox="0 0 24 24" width="18" height="18">
											<path
												fill="currentColor"
												d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
											/>
										</svg>
										<Trans>Leave Session</Trans>
									</button>
								</div>
							</>
						)}
					</div>
				</Modal>
			)}
		</I18n>
	);
}
