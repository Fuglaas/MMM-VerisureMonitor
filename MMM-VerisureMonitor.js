/* Magic Mirror
 * Module: VerisureMonitor
 *
 * By Simen Fuglaas (https://github.com/Fuglaas)
 * Inspired by Cato Antonsen (https://github.com/CatoAntonsen)
 * MIT Licensed.
 */

Module.register("MMM-VerisureMonitor",{

	// Default config
	defaults: {
		username: '',
		password: '',
		serviceReloadInterval: 10000,
		timeReloadInterval: 3600,
		animationSpeed: 1000
	},
	
	getStyles: function () {
		return ["verisureMonitor.css"];
	},
	
	getScripts: function() {
		return ["verisure-api.js"];
	},
	
	getTranslations: function() {
		return {
			en: "translations/en.json",
			nb: "translations/nb.json"
		}
	},

	start: function() {
		console.log(this.translate("STARTINGMODULE") + ": " + this.name);
		
		this.verisureData = [];
		
		sendSocketNotification("CONFIG", this.config);

		setInterval(function() {
			this.updateDomIfNeeded();
		}, this.config.timeReloadInterval);
	},
	
	getDom: function() {
		if (true) {
			var wrapper = document.createElement("div");
			consol.log(this.verisureData);
			wrapper.innerHTML = this.verisureData;
			return wrapper;
		} else {
			var wrapper = document.createElement("div");
			wrapper.innerHTML = this.translate("LOADING");
			wrapper.className = "small dimmed";
		}
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === "VERISURE_UPDATE") {
			this.verisureData = payload;
		}
	},
	updateDomIfNeeded: function() {
		if (true) {
			this.updateDom(this.config.animationSpeed);
		}
	}
});
