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
		serviceReloadInterval: 30000,
		timeReloadInterval: 30000,
		animationSpeed: 1000,
		showLocation: true,
		showTemperature: true,
		showHumidity: true,
		locations: [""]
	},
	
	getStyles: function () {
		return ["verisureMonitor.css"];
	},
	
	getTranslations: function() {
		return {
			en: "translations/en.json",
			nb: "translations/nb.json"
		}
	},

	start: function() {
		Log.log(this.translate("STARTINGMODULE") + ": " + this.name);
		
		var self = this;
		
		this.verisureData = [];
		
		this.sendSocketNotification("CONFIG", this.config);

		setInterval(function() {
			self.updateDomIfNeeded();
		}, this.config.timeReloadInterval);
	},
	
	getDom: function() {
		log.info(this.verisureData);
		if (this.verisureData !== null) {
			
			var table = document.createElement("table");
			var tr = document.createElement("tr");
			
			for (var i = 0; i < this.verisureData.length; i++) {
				tr = this.getTableRow(this.verisureData[i]);
				table.appendChild(tr);
			}
			
			var wrapper = document.createElement("div");
			wrapper.innerHTML = table;
			return table;
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
	},
	
	getTableRow: function(sensorData) {
		var tr = document.createElement("tr");
		for (var i = 0; i < this.config.locations; i++) {
			if (sensorData.location === this.config.locations[i]) {
				if (showLocation) {
					tr.appendChild(sensorData.location);
				}
				if (showTemperature) {
					tr.appendChild(sensorData.temperature);
				}
				if (showHumidity) {
					tr.appendChild(sensorData.humidity);
				}
			}
		}
	}
});
