/* MagicMirror²
 * Node Helper: MMM-Logging
 *
 * By shbatm
 * MIT Licensed.
 */

const Log = require("logger");
const NodeHelper = require("node_helper");

let tracer = require("tracer").console({
    format: "{{timestamp}} <{{title}}> {{message}} ({{folder}}/{{file}}:{{line}} {{method}})",
    overwriteConsoleMethods: true,
    dateformat: "yyyy-mm-dd'T'HH:MM:ss"
});

module.exports = NodeHelper.create({
    start () {
        this.initialized = false;
        Log.log(`Module helper started for ${this.name}`);
    },

    socketNotificationReceived (notification, payload) {
        if (notification === "INITIALIZE_LOGGING" && !this.initialized) {
            this.config = payload;
            if (this.config.useColor) {
                tracer = require("tracer").colorConsole(this.config);
            } else {
                tracer = require("tracer").console(this.config);
            }
            Log.info("MMM-Logging updated config received, reloading console");
            this.initialized = true;
        }
        if (notification === "NOTIFICATION_TO_CONSOLE" && payload) {
            const senderInfo = payload.sender ? ` from ${payload.sender}` : "";
            const payloadInfo = payload.payload ? ` payload: ${JSON.stringify(payload.payload, null, 3)}` : "";
            tracer.log(`Module Notification: ${payload.notification}${senderInfo}${payloadInfo}`);
        }
        if (notification === "BROWSER_ERROR") {
            tracer.log(`Browser Error: ${JSON.stringify(payload, null, 3)}`);
        }
    }
});
