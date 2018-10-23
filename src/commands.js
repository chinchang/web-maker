import {
	OPEN_SAVED_CREATIONS_EVENT,
	SAVE_EVENT
} from './commandPaletteService';

export const commands = [
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
		name: 'Add Library',
		run: '',
		keyboardShortcut: 'Cmd+F'
	}
];
