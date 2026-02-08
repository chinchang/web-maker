/**
 * Multiplayer utility functions for generating room IDs, usernames, and colors.
 */

const ADJECTIVES = [
	'Swift',
	'Brave',
	'Clever',
	'Daring',
	'Eager',
	'Fierce',
	'Gentle',
	'Happy',
	'Jolly',
	'Kind',
	'Lively',
	'Merry',
	'Noble',
	'Proud',
	'Quick',
	'Rapid',
	'Sharp',
	'Steady',
	'Vivid',
	'Wise',
	'Zesty',
	'Calm',
	'Bold',
	'Bright'
];

const ANIMALS = [
	'Panda',
	'Tiger',
	'Eagle',
	'Wolf',
	'Bear',
	'Fox',
	'Hawk',
	'Lion',
	'Owl',
	'Deer',
	'Seal',
	'Orca',
	'Lynx',
	'Raven',
	'Falcon',
	'Shark',
	'Dolphin',
	'Koala',
	'Otter',
	'Badger',
	'Moose',
	'Bison',
	'Crane',
	'Swan'
];

// Colors chosen for good contrast with white text (WCAG accessible)
const CURSOR_COLORS = [
	'#E53935', // Red
	'#00897B', // Teal
	'#1E88E5', // Blue
	'#43A047', // Green
	'#8E24AA', // Purple
	'#F4511E', // Deep Orange
	'#00ACC1', // Cyan
	'#3949AB', // Indigo
	'#D81B60', // Pink
	'#039BE5', // Light Blue
	'#7B1FA2', // Deep Purple
	'#00796B' // Dark Teal
];

const ROOM_ID_CHARS =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Generates a random room ID of specified length.
 * @param {number} length - Length of the room ID (default: 8)
 * @returns {string} Random alphanumeric room ID
 */
export function generateRoomId(length = 8) {
	let result = '';
	for (let i = 0; i < length; i++) {
		result += ROOM_ID_CHARS.charAt(
			Math.floor(Math.random() * ROOM_ID_CHARS.length)
		);
	}
	return result;
}

/**
 * Generates a random username in "Adjective Animal" format.
 * @returns {string} Random username like "Swift Panda"
 */
export function generateRandomUsername() {
	const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
	const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
	return `${adjective} ${animal}`;
}

/**
 * Generates a random color from the preset cursor colors palette.
 * @returns {string} Hex color code
 */
export function generateRandomColor() {
	return CURSOR_COLORS[Math.floor(Math.random() * CURSOR_COLORS.length)];
}

/**
 * Generates a complete user identity for multiplayer sessions.
 * @returns {Object} User identity object with name and color
 */
export function generateUserIdentity() {
	return {
		name: generateRandomUsername(),
		color: generateRandomColor()
	};
}

/**
 * Generates a shareable session URL with the room ID.
 * @param {string} roomId - The room ID to include in the URL
 * @returns {string} Complete shareable URL
 */
export function generateSessionUrl(roomId) {
	const url = new URL(window.location.href);
	url.searchParams.set('room', roomId);
	return url.toString();
}

/**
 * Extracts room ID from the current URL if present.
 * @returns {string|null} Room ID or null if not found
 */
export function getRoomIdFromUrl() {
	const params = new URLSearchParams(window.location.search);
	return params.get('room');
}

/**
 * Removes the room parameter from the current URL without page reload.
 */
export function removeRoomIdFromUrl() {
	const url = new URL(window.location.href);
	url.searchParams.delete('room');
	window.history.replaceState({}, '', url.toString());
}

/**
 * Updates the URL to include the room ID without page reload.
 * @param {string} roomId - The room ID to add to URL
 */
export function addRoomIdToUrl(roomId) {
	const url = new URL(window.location.href);
	url.searchParams.set('room', roomId);
	window.history.replaceState({}, '', url.toString());
}
