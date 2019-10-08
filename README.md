# MMM-Logging

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

This module extends the Node.js console logging capabilities of the MagicMirror² project through implementation of the [`tracer`](https://github.com/baryon/tracer) Node.js module, including adding timestamps and stack traces.

By default, this module will intercept and format ALL `console` log messages from the MagicMirror instance once it is loaded.

### Examples:

Before MMM-Logging:

```shell
0|mm  | Starting MagicMirror: v2.6.0-dev
0|mm  | Loading config ...
0|mm  | Loading module helpers ...
0|mm  | Initializing new module helper ...
0|mm  | Module helper loaded: MMM-Logging
0|mm  | No helper found for module: alert.
```

After MMM-Logging:

```shell
0|mm  | Starting MagicMirror: v2.6.0-dev
0|mm  | Loading config ...
0|mm  | Loading module helpers ...
0|mm  | 2018-12-05T12:42:51 <log> Initializing new module helper ... (js/app.js:128 loadModule)
0|mm  | 2018-12-05T12:42:51 <log> Module helper loaded: MMM-Logging (js/app.js:161 loadNextModule)
0|mm  | 2018-12-05T12:42:51 <log> No helper found for module: alert. (js/app.js:163 )
```

***Note:***
You can find more detailed information on debugging your MagicMirror here: [Module Debugging](https://github.com/MichMich/MagicMirror/wiki/Module-Debugging#logging). If you also want the Electron rederer (web browser) console logs to be printed to the standard console (or PM2 logs), change the following line to the very top of `~/MagicMirror/run-start.sh`
```sh
export ELECTRON_ENABLE_LOGGING=true
```

## Installing the module

To install the module, assuming you have MagicMirror installed with the default configuration:

```shell
cd ~/MagicMirror/modules
git clone https://github.com/shbatm/MMM-Logging.git
cd MMM-Logging/
npm install
```

## Using the module

To use this module, add the following configuration block to the **TOP** of the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-Logging',
            config: {
                // Module functions out of the box with nothing set here.
                // See below for configurable options.
            }
        }
    ]
}
```

## Configuration options

Refer to documentation for [`tracer`](https://github.com/baryon/tracer) for most configuration options. They can be applied directly in the `config` section.

#### Module specific options:

| Option           | Description
|----------------- |-----------
| `useColor`       | *Optional* Whether or not to use `tracer`'s `colorConsole` method or regular `console` method. <br>**Type:** `bool` *Default* `true`.
| `overwriteConsoleMethods`       | *Optional* Whether or not to overwrite the default Node.JS console methods. If `true` any `console.log`, `console.error`, etc. function calls in any module will be formatted.  If `false`, only calls to `tracer.log`, etc. will be formatted.  In most cases for MagicMirror, if you're using this module, you want `true` <br>**Type:** `bool` *Default* `true`.
| `overwriteBrowserMethods`       | *Optional* Whether or not to overwrite the default web browser console methods. If `true` any `console.log`, `console.error`, etc. function calls *in the DevTools console* in any module will be formatted.  If `false`, only calls to `tracer.log`, etc. will be formatted.<br>**Type:** `bool` *Default* `false`--usually the DevTools console is good enough for tracing errors.
| `echoModuleNotifications`       | *Optional* If set any module notifications sent on the front-end will be printed on the Node.JS console log. Can be set to 'notification' to just send the notifications, or 'payload' to include the payloads as well.<br>**Type:** `string` *Default* `'notification'`.
| `echoErrors`       | *Optional* If `true`, any errors in the web browser (front-end) will be printed on the Node.JS console log. <br>**Type:** `bool` *Default* `true`.
| `ignoreModules` | *Optional* Option to ignore notifications sent from certain modules. Defaults to ignoring `clock`, `calendar` and `newsfeed` since these send a lot of nusance notifications.

#### Default configuration:

```js
{
    format: "{{timestamp}} <{{title}}> {{message}} ({{folder}}/{{file}}:{{line}} {{method}})",
    dateformat: "yyyy-mm-dd'T'HH:MM:ss",
    stackIndex: 2,
}
```

