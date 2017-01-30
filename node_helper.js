/* Magic Mirror
 * Node Helper: VerisureMonitor
 *
 * By Simen Fuglaas (https://github.com/Fuglaas)
 * Inspired by Cato Antonsen (https://github.com/CatoAntonsen)
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var verisureApi = require("verisure-api");

module.exports = NodeHelper.create({
	start: function() {
		console.log("Starting module-helper: " + this.name);
	},
	
	socketNotificationReceived: function(notification, config) {
		if (notification === "CONFIG") {
			console.log(this.name + " received config notify")
			
			this.config = config;
			this.currentData = [];
			this.initPolling();
			return;
		}else{console.log("didnt get it");return;}
	},
	
	initPolling: function() {
		var self = this;
		
		console.log("Initializing Verisure polling");
		
		console.log(this.config.username);
		
		// Setup listener
		this.listener = verisureApi.setup(this.config);
		
		// Register listener
		this.listener.on('climateChange', this.logData);
		console.log(this.listener.on('climateChange', this.logData));
		
		this.getData()
		
		// First call
		this.startPolling();
		
		// Set the polling interval
		setInterval(function() {
			self.startPolling();
		}, this.config.serviceReloadInterval);
	},
	
	startPolling: function() {
		
		this.getData();

		
	},
	
	logData: function(data) {
		console.log("Sensor 0: " + data[0].location + " " + data[0].temperature);
		console.log("Sensor 1: " + data[1].location + " " + data[1].temperature + " " + data[1].humidity);
		console.log("Sensor 2: " + data[2].location + " " + data[2].temperature + " " + data[2].humidity);
	},
	
	getData: function() {
		var self = this;
		var cData = this.listener.get('climateData');
		Promise.resolve(cData).then(function(value) {
			self.sendSocketNotification("VERISURE_UPDATE", value);
		}, function(value){
		});
		console.log("cData: " + cData);
	}
	
});
