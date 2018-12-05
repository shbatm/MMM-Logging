/* Magic Mirror
 * Node Helper: MMM-Logging
 *
 * By shbatm
 * MIT Licensed.
 */
/* jshint node: true, esversion: 6*/

var NodeHelper = require("node_helper");
var newConsole;

module.exports = NodeHelper.create({
    config: {},

    start: function() {
    	if (this.config.useColor) {
    		newConsole = require('tracer').colorConsole(this.config);
    	} else {
    		newConsole = require('tracer').console(this.config);
    	}
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "INITIALIZE_LOGGING") {
            this.config = payload;
        }
    },
});