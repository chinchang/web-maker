import { deferred } from './deferred';
import { log } from 'util';

export const SWITCH_FILE_EVENT = 'switchFileEvent';
export const OPEN_SAVED_CREATIONS_EVENT = 'openSavedCreationsEvent';
export const SAVE_EVENT = 'saveEvent';

export const commandPaletteService = {
	subscriptions: {},
	subscribe(eventName, callback) {
		console.log('subscribed for ', eventName);
		this.subscriptions[eventName] = this.subscriptions[eventName] || [];
		this.subscriptions[eventName].push(callback);
		return () => {
			console.log('Unsubscribing ', eventName);
			this.subscriptions[eventName].splice(
				this.subscriptions[eventName].indexOf(callback),
				1
			);
		};
	},
	publish(eventName, ...args) {
		console.log('published ', eventName, args);
		const callbacks = this.subscriptions[eventName] || [];
		callbacks.forEach(callback => {
			callback.apply(null, args);
		});
	}
};
