# MMM-Logging Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [1.0.4](https://github.com/shbatm/MMM-Logging/compare/v1.0.3...v1.0.4)

### Changed

- chore: add linter and formatter - and fix found issues
- chore: switch License file to markdown
- chore: update Code of Conduct to current version
- docs: add Code of Conduct and License sections to README
- docs: rework Configuration section
- refactor: replace dependency `tracer` with own logger

## [1.0.3](https://github.com/shbatm/MMM-Logging/compare/v1.0.2...v1.0.3)

### Changed

- chore: remove unused dependency 'tinyify' from package.json (#7)
- chore: Non-Substantive changes to conform to recommendations (#5)
- feat: Default to Ignore Clock Notifications as well
- refactor: introduce extra variables to make the notification logging logic clearer (#9)

### Fixed

- Ignore empty payloads

## [1.0.2](https://github.com/shbatm/MMM-Logging/compare/v1.0.1...v1.0.2) - Remove Testing Code & Add Ignore Modules option

### Added

- `ignoreModules` option to ignore notifications sent from certain modules. Defaults to ignoring `calendar` and `newsfeed` since these send a lot of nusance notifications.

### Changed

- Removed errant code from testing phase.

## [1.0.1](https://github.com/shbatm/MMM-Logging/compare/v1.0.0...v1.0.1) - Add browser methods

### Added

- `overwriteBrowserMethods` option to format the Web Browser's (DevTools) logs as well as the Node.JS console logs. Defaults to `false` so to enable it, you must add it in your config section.
- `echoModuleNotifications` option to relay module notifications to the NodeJS console as well as DevTools.
- `echoErrors` option to relay browser errors to the NodeJS console as well as DevTools.

## [1.0.0](https://github.com/shbatm/MMM-Logging/releases/tag/v1.0.0) - Initial Release

- Initial commit for public testing.
