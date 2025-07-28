/* eslint-disable no-console */
/* global Log, Module, UniversalLogger */

/* MagicMirror²
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
        overwriteBrowserMethods: false,
        echoModuleNotifications: "notification",
        echoErrors: true,
        dateformat: "yyyy-mm-dd'T'HH:MM:ss",
        ignoreModules: ["calendar", "newsfeed", "clock"]
    },

    start () {
        this.sendSocketNotification("INITIALIZE_LOGGING", this.config);
        if (this.config.overwriteBrowserMethods) {
            this.config.overwriteConsoleMethods = true;
            // Overwrite the Main Console
            this.console = new UniversalLogger(this.config);
            // Overwrite MagicMirror's Log functions.
            Log.log = console.log;
            Log.info = console.info;
            Log.warn = console.warn;
            Log.error = console.error;
            Log.debug = console.debug || console.log;
        }
        Log.info("MMM-Logging updated window.console.");

        if (this.config.echoErrors) {
            Log.error = (text) => {
                this.sendSocketNotification("BROWSER_ERROR", text);
                this.console.error(text);
            };
            window.addEventListener("error", (event) => {
                this.sendSocketNotification("BROWSER_ERROR", event);
            });
        }
        this.initialized = true;
    },

    getScripts () {
        return ["universal-logger.js"];
    },

    notificationReceived (notification, payload, sender) {
        if (this.config.echoModuleNotifications) {
            if (sender && this.config.ignoreModules?.includes(sender.name)) {
                return;
            }
            this.sendSocketNotification("NOTIFICATION_TO_CONSOLE", {
                notification,
                payload: payload && this.config.echoModuleNotifications === "payload" ? payload : null,
                sender: sender ? sender.name : null
            });
        }
    }

});
