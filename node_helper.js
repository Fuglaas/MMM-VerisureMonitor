/* Magic Mirror
 * Node Helper: VerisureMonitor
 *
 * By Simen Fuglaas (https://github.com/Fuglaas)
 * Inspired by Cato Antonsen (https://github.com/CatoAntonsen)
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var verisureApi = require("verisure-api");

var currentData;

module.exports = NodeHelper.create({
	start: function() {
		console.log("Starting module: " + this.name);
		console.log("no shit");
	},
	
	socketNotificationReceived: function(notification, config) {
		console.log(notification)
		if (notification === "CONFIG") {
			console.log(this.name + " received config notify")
			this.config = config;
			this.initPolling();
			return;
		}else{console.log("didnt get it")}
	},
	
	initPolling: function() {
		var self = this;
		
		console.log("Initializing Verisure polling");
		
		// Setup listener
		verisureApi.setup(this.config)
		
		// Register listener
		verisureApi.on('climateChange', this.getData)
		
		// First call
		this.startPolling();
		
		// Set the polling interval
		setInterval(function() {
			self.startPolling();
		}, this.config.serviceReloadInterval);
	},
	
	startPolling: function() {
		var self = this;
		console.log("Polling Verisure data");
		self.sendSocketNotification("VERISURE_UPDATE", currentData);
	},
	
	getData: function(data) {
		currentData = data;
		console.log("Updating Verisure Data...")
	}
});
