/* MagicMirror²
 * Node Helper: MMM-Logging
 *
 * By shbatm
 * MIT Licensed.
 */
/* jshint node: true, esversion: 6*/

var NodeHelper = require("node_helper");
var tracer = require("tracer").console({
    format: "{{timestamp}} <{{title}}> {{message}} ({{folder}}/{{file}}:{{line}} {{method}})",
    overwriteConsoleMethods: true,
    dateformat: "yyyy-mm-dd'T'HH:MM:ss",
});

module.exports = NodeHelper.create({
    start: function() {
        this.initialized = false;
        console.log("Module helper started for " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "INITIALIZE_LOGGING" && !this.initialized) {
            this.config = payload;
            if (this.config.useColor) {
                tracer = require('tracer').colorConsole(this.config);
            } else {
                tracer = require('tracer').console(this.config);
            }
            console.info("MMM-Logging updated config received, reloading console");
            this.initialized = true;
        }
        if (notification === "NOTIFICATION_TO_CONSOLE" && payload) {
            tracer.log("Module Notification: " + payload.notification + ((payload.sender) ? " from " + payload.sender : "") + (payload) ? " payload: " + JSON.stringify(payload, undefined, 3) : "");
        }
        if (notification === "BROWSER_ERROR") {
            tracer.log("Browser Error: " + JSON.stringify(payload, undefined, 3));
        }
    },
});
