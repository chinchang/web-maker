export const LocalStorageKeys = {
	LOGIN_AND_SAVE_MESSAGE_SEEN: 'loginAndsaveMessageSeen',
	ASKED_TO_IMPORT_CREATIONS: 'askedToImportCreations',
	WAS_CONSOLE_OPEN: 'wasConsoleOpen'
};

// Multiplayer collaboration server URL
// For development, run: npm run start:collab
// For production, update this to your deployed server URL
export const COLLAB_SERVER_URL =
	window.location.hostname === 'localhost'
		? 'ws://localhost:4444'
		: 'wss://your-collab-server.com';
