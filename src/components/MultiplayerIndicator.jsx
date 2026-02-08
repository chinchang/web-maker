import { h } from 'preact';
import { Trans, t } from '@lingui/macro';
import { I18n } from '@lingui/react';

/**
 * MultiplayerIndicator - Shows multiplayer session status in the header
 *
 * Props:
 * - participants: array - List of participants with {clientId, name, color, isLocal}
 * - connectionStatus: string - 'connected' | 'connecting' | 'disconnected' | 'error'
 * - onOpenModal: function - Called when user clicks on indicator to open modal
 * - onLeave: function - Called when user clicks leave button
 */
export default function MultiplayerIndicator({
	participants = [],
	connectionStatus = 'connected',
	onOpenModal,
	onLeave
}) {
	// Show max 3 participant avatars
	const visibleParticipants = participants.slice(0, 3);
	const remainingCount = Math.max(0, participants.length - 3);

	return (
		<I18n>
			{({ i18n }) => (
				<div class="multiplayer-indicator" onClick={onOpenModal}>
					<span
						class="multiplayer-indicator__status-dot"
						data-status={connectionStatus}
						title={
							connectionStatus === 'connected'
								? i18n._(t`Connected`)
								: connectionStatus === 'connecting'
									? i18n._(t`Connecting...`)
									: i18n._(t`Disconnected`)
						}
					/>

					<div class="multiplayer-indicator__avatars">
						{visibleParticipants.map((participant, index) => (
							<span
								key={participant.clientId}
								class="multiplayer-indicator__avatar"
								style={{
									backgroundColor: participant.color,
									zIndex: visibleParticipants.length - index
								}}
								title={participant.name}
							>
								{participant.name.charAt(0).toUpperCase()}
							</span>
						))}
						{remainingCount > 0 && (
							<span class="multiplayer-indicator__avatar multiplayer-indicator__avatar--more">
								+{remainingCount}
							</span>
						)}
					</div>

					<span class="multiplayer-indicator__count">
						{participants.length}
					</span>

					<button
						class="multiplayer-indicator__leave-btn"
						onClick={e => {
							e.stopPropagation();
							onLeave();
						}}
						title={i18n._(t`Leave session`)}
					>
						<svg viewBox="0 0 24 24" width="14" height="14">
							<path
								fill="currentColor"
								d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
							/>
						</svg>
					</button>
				</div>
			)}
		</I18n>
	);
}
