# MMM-Logging

This is a module for the [MagicMirror²](https://github.com/MagicMirrorOrg/MagicMirror/).

This module extends the Node.js console logging capabilities of the MagicMirror² project through a modern built-in logger implementation, including adding timestamps and stack traces.

By default, this module will intercept and format ALL `console` log messages from the MagicMirror instance once it is loaded.

## Examples

### Before MMM-Logging

```shell
0|mm  | Starting MagicMirror: v2.6.0-dev
0|mm  | Loading config ...
0|mm  | Loading module helpers ...
0|mm  | Initializing new module helper ...
0|mm  | Module helper loaded: MMM-Logging
0|mm  | No helper found for module: alert.
```

### After MMM-Logging

![Example 1](example1.png)

**_Note:_**
You can find more detailed information on debugging your MagicMirror here: [Module Debugging](https://github.com/MagicMirrorOrg/MagicMirror/wiki/Module-Debugging#logging). If you also want the Electron rederer (web browser) console logs to be printed to the standard console (or PM2 logs), change the following line to the very top of `~/MagicMirror/run-start.sh`

```sh
export ELECTRON_ENABLE_LOGGING=true
```

## Installing the module

To install the module, assuming you have MagicMirror installed with the default configuration:

```shell
cd ~/MagicMirror/modules
git clone https://github.com/shbatm/MMM-Logging
```

## Updating the module

```sh
cd ~/MagicMirror/modules/MMM-Logging
git pull
```

## Configuration

To use this module, add the following configuration block to the **TOP** of the modules array in the `config/config.js` file:

### Minimal configuration

```js
        {
            module: 'MMM-Logging',
            config: {
                // Module functions out of the box with nothing set here.
                // See below for configurable options.
            }
        },
```

### Configuration options

The module supports various configuration options to customize the logging format and behavior.

#### Module specific options

| Option                    | Description                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `useColor`                | _Optional_ Whether or not to use colored console output. <br>**Type:** `bool` _Default_ `true`.                                                                                                                                                                                                                                                                                      |
| `overwriteConsoleMethods` | _Optional_ Whether or not to overwrite the default Node.JS console methods. If `true` any `console.log`, `console.error`, etc. function calls in any module will be formatted. If `false`, only the module's internal logger will be formatted. In most cases for MagicMirror, if you're using this module, you want `true` <br>**Type:** `bool` _Default_ `true`.                   |
| `overwriteBrowserMethods` | _Optional_ Whether or not to overwrite the default web browser console methods. If `true` any `console.log`, `console.error`, etc. function calls _in the DevTools console_ in any module will be formatted. If `false`, only the module's internal logger will be formatted.<br>**Type:** `bool` _Default_ `false`--usually the DevTools console is good enough for tracing errors. |
| `echoModuleNotifications` | _Optional_ If set any module notifications sent on the front-end will be printed on the Node.JS console log. Can be set to 'notification' to just send the notifications, or 'payload' to include the payloads as well.<br>**Type:** `string` _Default_ `'notification'`.                                                                                                            |
| `echoErrors`              | _Optional_ If `true`, any errors in the web browser (front-end) will be printed on the Node.JS console log. <br>**Type:** `bool` _Default_ `true`.                                                                                                                                                                                                                                   |
| `ignoreModules`           | _Optional_ Option to ignore notifications sent from certain modules. Defaults to ignoring `clock`, `calendar` and `newsfeed` since these send a lot of nuisance notifications.                                                                                                                                                                                                       |
| `format`                  | _Optional_ Custom format string for log messages. Supports placeholders: `{{timestamp}}`, `{{title}}`, `{{message}}`, `{{folder}}`, `{{file}}`, `{{line}}`, `{{method}}`. <br>**Type:** `string` _Default_ `"{{timestamp}} <{{title}}> {{message}} ({{folder}}/{{file}}:{{line}} {{method}})"`.                                                                                      |

### Default configuration

```js
    {
        useColor: true,
        format: "{{timestamp}} <{{title}}> {{message}} ({{folder}}/{{file}}:{{line}} {{method}})",
        overwriteConsoleMethods: true,
        overwriteBrowserMethods: false,
        echoModuleNotifications: "notification",
        echoErrors: true,
        dateformat: "yyyy-mm-dd'T'HH:MM:ss",
        ignoreModules: ["calendar", "newsfeed", "clock"]
    },
```

## Contributing

If you find any problems, bugs or have questions, please [open a GitHub issue](https://github.com/KristjanESPERANTO/MMM-Forum/issues) in this repository.

Pull requests are of course also very welcome 🙂

### Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

### Developer commands

- `npm install` - Install development dependencies.
- `node --run lint` - Run linting and formatter checks.
- `node --run lint:fix` - Fix linting and formatter issues.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
