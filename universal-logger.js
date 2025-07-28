/* eslint-disable no-console */
/* Universal Logger Implementation
 * Works in both Node.js and Browser environments
 * Replacement for tracer library
 * MIT Licensed.
 */

// Environment detection
const isNode = typeof window === "undefined" && typeof module !== "undefined" && module.exports;
const isBrowser = typeof window !== "undefined";

// Universal Logger Class
class UniversalLogger {
    constructor (config = {}) {
        this.config = {
            format: "{{timestamp}} <{{title}}> {{message}} ({{folder}}/{{file}}:{{line}} {{method}})",
            dateformat: "yyyy-mm-dd'T'HH:MM:ss",
            useColor: false,
            overwriteConsoleMethods: true,
            ...config
        };

        // Colors for different environments
        if (isNode) {
            // ANSI color codes for Node.js
            this.colors = {
                log: "\x1b[37m", // white
                info: "\x1b[36m", // cyan
                warn: "\x1b[33m", // yellow
                error: "\x1b[31m", // red
                debug: "\x1b[35m", // magenta
                reset: "\x1b[0m"
            };
        } else {
            // CSS styles for browser
            this.colors = {
                log: "color: #000000", // black
                info: "color: #0000FF", // blue
                warn: "color: #FFA500", // orange
                error: "color: #FF0000", // red
                debug: "color: #800080" // purple
            };
        }
    }

    static formatTimestamp () {
        const now = new Date();
        return now.toISOString()
            .replace("T", "T")
            .substring(0, 19);
    }

    static getStackInfo () {
        const {stack} = new Error();
        if (stack) {
            const lines = stack.split("\n");
            // Find the first line that's not from this logger
            for (let index = 4; index < lines.length; index += 1) {
                const line = lines[index];
                if (line && !line.includes("universal-logger.js")) {
                    const match = line.match(/at\s+(?<method>.+?)\s+\((?<filepath>.+):(?<line>\d+):(?<column>\d+)\)/u) ||
                      line.match(/at\s+(?<filepath>.+):(?<line>\d+):(?<column>\d+)/u);
                    if (match && match.groups) {
                        const {method = "anonymous", filepath, line: lineNum} = match.groups;
                        const parts = filepath.split("/");
                        const file = parts.pop() || "unknown";
                        const folder = parts.pop() || "unknown";
                        return {method, file, folder, line: lineNum};
                    }
                }
            }
        }
        return {method: "unknown", file: "unknown", folder: "unknown", line: "0"};
    }

    formatMessage (level, message) {
        const timestamp = UniversalLogger.formatTimestamp();
        const {method, file, folder, line} = UniversalLogger.getStackInfo();

        const formatted = this.config.format
            .replace("{{timestamp}}", timestamp)
            .replace("{{title}}", level.toUpperCase())
            .replace("{{message}}", message)
            .replace("{{method}}", method)
            .replace("{{file}}", file)
            .replace("{{folder}}", folder)
            .replace("{{line}}", line);

        return formatted;
    }

    logWithColor (level, message) {
        const formatted = this.formatMessage(level, message);

        if (this.config.useColor) {
            if (isNode) {
                // Node.js: Use ANSI codes
                const colorCode = this.colors[level] || this.colors.log;
                if (level === "error") {
                    console.error(colorCode + formatted + this.colors.reset);
                } else {
                    console[level](colorCode + formatted + this.colors.reset);
                }
            } else {
                // Browser: Use CSS styles
                const colorStyle = this.colors[level] || this.colors.log;
                console[level](`%c${formatted}`, colorStyle);
            }
        } else if (level === "error") {
            console.error(formatted);
        } else {
            console[level](formatted);
        }
    }

    log (message) {
        this.logWithColor("log", message);
    }

    info (message) {
        this.logWithColor("info", message);
    }

    warn (message) {
        this.logWithColor("warn", message);
    }

    error (message) {
        this.logWithColor("error", message);
    }

    debug (message) {
        this.logWithColor("debug", message);
    }
}

// Export for different environments
if (isNode) {
    // Node.js export - clean ES module style
    module.exports = UniversalLogger;
} else if (isBrowser) {
    // Browser export - single global class
    window.UniversalLogger = UniversalLogger;
}
