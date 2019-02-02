# MMM-Logging Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [1.0.2] - Remove Testing Code & Add Ignore Modules option

#### Added:
- `ignoreModules` option to ignore notifications sent from certain modules. Defaults to ignoring `calendar` and `newsfeed` since these send a lot of nusance notifications.

#### Changed:
- Removed errant code from testing phase.

## [1.0.1] - Add browser methods

#### Added:
- `overwriteBrowserMethods` option to format the Web Browser's (DevTools) logs as well as the Node.JS console logs.  Defaults to `false` so to enable it, you must add it in your config section.
- `echoModuleNotifications` option to relay module notifications to the NodeJS console as well as DevTools.
- `echoErrors` option to relay browser errors to the NodeJS console as well as DevTools.

## [1.0.0] - Initial Release

* Initial commit for public testing.