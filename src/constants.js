export const LocalStorageKeys = {
	LOGIN_AND_SAVE_MESSAGE_SEEN: 'loginAndsaveMessageSeen',
	ASKED_TO_IMPORT_CREATIONS: 'askedToImportCreations',
	WAS_CONSOLE_OPEN: 'wasConsoleOpen'
};

// Multiplayer collaboration server URL
// For development: npm run start:collab (runs on ws://localhost:4444)
// For production: Deploy collab-server/ to Railway and update the URL below
export const COLLAB_SERVER_URL =
	window.location.hostname === 'localhost'
		? 'ws://localhost:4444'
		: 'wss://web-maker-backend-production.up.railway.app';
