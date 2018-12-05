# MMM-Logging

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

This module extends the Node.js console logging capabilities of the MagicMirror² project through implementation of the [`tracer`](https://github.com/baryon/tracer) Node.js module, including adding timestamps and stack traces.

By default, this module will intercept and format ALL `console` log messages from the MagicMirror instance once it is loaded.

## Installing the module

To install the module, assuming you have MagicMirror installed with the default configuration:

```shell
cd ~/MagicMirror/modules
git clone https://github.com/shbatm/MMM-Logging.git
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

#### Default configuration:

```js
{
    format: "{{timestamp}} <{{title}}> {{message}} ({{folder}}/{{file}}:{{line}} {{method}})",
    dateformat: "yyyy-mm-dd'T'HH:MM:ss",
    stackIndex: 2,
}
```

