/**
 * Multiplayer service for managing Yjs collaborative editing sessions.
 */

import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { COLLAB_SERVER_URL } from './constants';
import {
	generateRoomId,
	generateUserIdentity,
	generateSessionUrl,
	addRoomIdToUrl,
	removeRoomIdFromUrl
} from './multiplayerUtils';

/**
 * Creates a new multiplayer session as host.
 * @param {Object} initialContent - Initial content for the session
 * @param {string} initialContent.html - HTML code
 * @param {string} initialContent.css - CSS code
 * @param {string} initialContent.js - JavaScript code
 * @returns {Object} Session object with ydoc, provider, roomId, awareness, and url
 */
export function createSession(initialContent = { html: '', css: '', js: '' }) {
	const roomId = generateRoomId();
	const ydoc = new Y.Doc();

	// Initialize Y.Text instances with current content
	const yHtml = ydoc.getText('html');
	const yCss = ydoc.getText('css');
	const yJs = ydoc.getText('js');

	// Insert initial content into Y.Text
	if (initialContent.html) {
		yHtml.insert(0, initialContent.html);
	}
	if (initialContent.css) {
		yCss.insert(0, initialContent.css);
	}
	if (initialContent.js) {
		yJs.insert(0, initialContent.js);
	}

	// Connect to WebSocket server
	const provider = new WebsocketProvider(COLLAB_SERVER_URL, roomId, ydoc);

	// Set up local user awareness
	const userIdentity = generateUserIdentity();
	provider.awareness.setLocalStateField('user', userIdentity);

	// Update URL with room ID
	addRoomIdToUrl(roomId);

	return {
		ydoc,
		provider,
		awareness: provider.awareness,
		roomId,
		url: generateSessionUrl(roomId),
		userIdentity,
		isHost: true
	};
}

/**
 * Joins an existing multiplayer session.
 * @param {string} roomId - The room ID to join
 * @returns {Promise<Object>} Session object with ydoc, provider, roomId, awareness
 */
export function joinSession(roomId) {
	return new Promise((resolve, reject) => {
		const ydoc = new Y.Doc();

		// Connect to WebSocket server
		const provider = new WebsocketProvider(COLLAB_SERVER_URL, roomId, ydoc);

		// Set up local user awareness
		const userIdentity = generateUserIdentity();
		provider.awareness.setLocalStateField('user', userIdentity);

		// Wait for initial sync
		const onSync = isSynced => {
			if (isSynced) {
				provider.off('sync', onSync);
				resolve({
					ydoc,
					provider,
					awareness: provider.awareness,
					roomId,
					url: generateSessionUrl(roomId),
					userIdentity,
					isHost: false
				});
			}
		};

		provider.on('sync', onSync);

		// Handle connection errors
		provider.on('connection-error', error => {
			provider.off('sync', onSync);
			reject(new Error(`Failed to connect to session: ${error.message}`));
		});

		// Timeout after 10 seconds
		setTimeout(() => {
			if (provider.wsconnected === false) {
				provider.off('sync', onSync);
				provider.destroy();
				reject(new Error('Connection timeout'));
			}
		}, 10000);
	});
}

/**
 * Leaves the current multiplayer session and cleans up resources.
 * @param {Object} session - Session object to leave
 * @param {Y.Doc} session.ydoc - Yjs document
 * @param {WebsocketProvider} session.provider - WebSocket provider
 * @returns {Object} Final content from the session
 */
export function leaveSession(session) {
	if (!session) return null;

	// Get final content before leaving
	const finalContent = {
		html: session.ydoc.getText('html').toString(),
		css: session.ydoc.getText('css').toString(),
		js: session.ydoc.getText('js').toString()
	};

	// Cleanup
	if (session.provider) {
		session.provider.awareness.setLocalState(null);
		session.provider.disconnect();
		session.provider.destroy();
	}

	if (session.ydoc) {
		session.ydoc.destroy();
	}

	// Remove room from URL
	removeRoomIdFromUrl();

	return finalContent;
}

/**
 * Gets participants from the awareness state.
 * @param {Object} awareness - Yjs awareness instance
 * @returns {Array} Array of participant objects with clientId, name, and color
 */
export function getParticipants(awareness) {
	if (!awareness) return [];

	const participants = [];
	awareness.getStates().forEach((state, clientId) => {
		if (state.user) {
			participants.push({
				clientId,
				name: state.user.name,
				color: state.user.color,
				isLocal: clientId === awareness.clientID
			});
		}
	});

	return participants;
}

/**
 * Creates an observer for participant changes.
 * @param {Object} awareness - Yjs awareness instance
 * @param {Function} callback - Callback to call when participants change
 * @returns {Function} Unsubscribe function
 */
export function onParticipantsChange(awareness, callback) {
	if (!awareness) return () => {};

	const handler = () => {
		callback(getParticipants(awareness));
	};

	awareness.on('change', handler);

	// Call immediately with current state
	handler();

	return () => {
		awareness.off('change', handler);
	};
}

/**
 * Creates an observer for connection status changes.
 * @param {WebsocketProvider} provider - WebSocket provider
 * @param {Function} callback - Callback to call when status changes
 * @returns {Function} Unsubscribe function
 */
export function onConnectionStatusChange(provider, callback) {
	if (!provider) return () => {};

	const handler = ({ status }) => {
		callback(status);
	};

	provider.on('status', handler);

	// Call immediately with current state
	callback(provider.wsconnected ? 'connected' : 'disconnected');

	return () => {
		provider.off('status', handler);
	};
}
