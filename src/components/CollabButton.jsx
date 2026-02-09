import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Trans, t } from '@lingui/macro';
import { I18n } from '@lingui/react';

/**
 * CollabButton - Button for starting/viewing multiplayer collaboration sessions
 *
 * Shows different states:
 * - No session: "Collab" button (with Pro badge for non-pro users)
 * - Active session: Connection status, participant avatars, count
 * - Offline: Disabled button
 */
export function CollabButton({
	user,
	multiplayerSession,
	multiplayerParticipants = [],
	multiplayerConnectionStatus,
	onMultiplayerBtnClick,
	onMultiplayerModalOpen,
	onProModalOpen
}) {
	const [isOnline, setIsOnline] = useState(navigator.onLine);

	useEffect(() => {
		const handleOnline = () => setIsOnline(true);
		const handleOffline = () => setIsOnline(false);

		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	}, []);

	const handleClick = () => {
		if (!isOnline) return;

		if (multiplayerSession) {
			onMultiplayerModalOpen();
		} else if (user?.isPro) {
			onMultiplayerBtnClick();
		} else {
			onProModalOpen();
		}
	};

	return (
		<I18n>
			{({ i18n }) => (
				<button
					class={`btn btn--dark hint--bottom-left ${multiplayerSession ? 'btn--multiplayer-active' : ''}`}
					aria-label={
						!isOnline
							? i18n._(t`Collaboration unavailable offline`)
							: multiplayerSession
								? i18n._(t`Multiplayer session active`)
								: i18n._(t`Start multiplayer collaboration session`)
					}
					data-testid="multiplayerButton"
					onClick={handleClick}
					disabled={!isOnline}
					title={
						!isOnline ? 'Collaboration requires internet connection' : undefined
					}
				>
					{multiplayerSession ? (
						<>
							<span
								class="multiplayer-status-dot"
								data-status={multiplayerConnectionStatus}
							/>
							<span class="multiplayer-avatars">
								{multiplayerParticipants.slice(0, 3).map((p, i) => (
									<span
										key={p.clientId}
										class="multiplayer-avatar"
										style={{
											backgroundColor: p.color,
											zIndex: 3 - i
										}}
										title={p.name}
									>
										{p.name.charAt(0).toUpperCase()}
									</span>
								))}
							</span>
							<span class="multiplayer-count">
								{multiplayerParticipants.length}
							</span>
						</>
					) : (
						<>
							<svg viewBox="0 0 24 24" width="18" height="18">
								<path
									fill="currentColor"
									d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
								/>
							</svg>
							<Trans>Collab</Trans>
						</>
					)}
				</button>
			)}
		</I18n>
	);
}
