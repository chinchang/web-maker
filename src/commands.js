export const SWITCH_FILE_EVENT = 'switchFileEvent';
export const NEW_CREATION_EVENT = 'newCreationEvent';
export const OPEN_SAVED_CREATIONS_EVENT = 'openSavedCreationsEvent';
export const SAVE_EVENT = 'saveEvent';
export const OPEN_SETTINGS_EVENT = 'openSettingsEvent';
export const SHOW_KEYBOARD_SHORTCUTS_EVENT = 'showKeyboardShortcutsEvent';

export const commands = [
	{
		name: 'Start New Creation',
		event: NEW_CREATION_EVENT,
		keyboardShortcut: ''
	},
	{
		name: 'Open Creation',
		event: OPEN_SAVED_CREATIONS_EVENT,
		keyboardShortcut: 'Cmd+O'
	},
	{
		name: 'Save Creation',
		event: SAVE_EVENT,
		keyboardShortcut: 'Cmd+S'
	},
	{
		name: 'Open Settings',
		event: OPEN_SETTINGS_EVENT,
		keyboardShortcut: ''
	},
	{
		name: 'Show Keyboard Shortcuts',
		event: SHOW_KEYBOARD_SHORTCUTS_EVENT,
		keyboardShortcut: ''
	}
];
