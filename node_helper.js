/* Magic Mirror
 * Node Helper: MMM-Logging
 *
 * By shbatm
 * MIT Licensed.
 */
/* jshint node: true, esversion: 6*/

var NodeHelper = require("node_helper");
var newConsole = require("tracer").console({
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
                newConsole = require('tracer').colorConsole(this.config);
            } else {
                newConsole = require('tracer').console(this.config);
            }
            console.info("MMM-Logging updated config received, reloading console");
            this.initialized = true;
        }
    },
});