/* global Module */

/* Magic Mirror
 * Module: MMM-Logging
 *
 * By shbatm
 * MIT Licensed.
 */

Module.register("MMM-Logging", {
    defaults: {
        useColor: true,
        format: "{{timestamp}} <{{title}}> {{message}} ({{folder}}/{{file}}:{{line}} {{method}})",
        overwriteConsoleMethods: true,
        dateformat: "yyyy-mm-dd'T'HH:MM:ss",
    },

    requiresVersion: "2.1.0", // Required version of MagicMirror

    start: function() {
        var self = this;
        this.sendSocketNotification("INITIALIZE_LOGGING", this.config);
    },

    getScripts: function() {
        return [];
    },

    getStyles: function() {
        return [];
    },

    // socketNotificationReceived from helper
    socketNotificationReceived: function(notification, payload) {

    },
});