export const commandPaletteService = {
	subscriptions: {},
	subscribe(eventName, callback) {
		this.subscriptions[eventName] = this.subscriptions[eventName] || [];
		this.subscriptions[eventName].push(callback);
		return () => {
			this.subscriptions[eventName].splice(
				this.subscriptions[eventName].indexOf(callback),
				1
			);
		};
	},
	publish(eventName, ...args) {
		const callbacks = this.subscriptions[eventName] || [];
		callbacks.forEach(callback => {
			callback.apply(null, args);
		});
	}
};
