# catbee-logger

[![Build Status][travis-img]][travis-url]
[![Code Coverage][codecov-img]][codecov-url]

## Logger for catbee with enrichments and transports
``` js
  const loggerService = require('catbee-logger');
  loggerService.register(serviceLocator);

  const logger = serviceLocator.resolve('logger');
```

### Levels
- debug
- trace
- info
- warn
- error
- fatal

Each level presented as function.
For error and fatal interface is:
``` js
/**
 * @param {string|Object|Error} message
 * @param {Object|undefined} meta
 */
function error (message, meta = {}) {}
function fatal (message, meta = {}) {}
```
And for debug, trace, info and warn interface is:
``` js
/**
 * @param {string} message
 * @param {Object|undefined} meta
 */
function debug (message, meta = {}) {}
function trace (message, meta = {}) {}
function info (message, meta = {}) {}
function warn (message, meta = {}) {}
```

### Enricments
Every log object can be enrich and unenrich with whatever you want. Just add function for it:
``` js
  const enrichment = (log, level) => log.from = 'Browser';
  logger.addEnrichment(enrichment);
  logger.removeEnrichment(enrichment);
  logger.dropEnrichments(); // remove all enrichments
```

### Transports
Send your log object to every added transports
``` js
  // browser.js
  const browserTransport =  (level, log) => { // send log to server or any }
  logger.addTransport(browserTransport);
  logger.removeTransport(browserTransport);

  // server.js
  // server logger is a winston wrapper and logger.addTransport = winstonLogger.add
  logger.addTransport(grayLog2, grayLogOptions);
  // server logger is a winston wrapper and logger.removeTransport = winstonLogger.remove
  logger.removeTransport(grayLog2);


  logger.dropTransports(); // remove all transports from logger
```

## eventBus errors
logger in register method automatic subscribe to `error` event in eventBus

[travis-img]: https://travis-ci.org/catbee/catbee-logger.svg?branch=master
[travis-url]: https://travis-ci.org/catbee/catbee-logger

[codecov-img]: https://codecov.io/github/catbee/catbee-logger/coverage.svg?branch=master
[codecov-url]: https://codecov.io/github/catbee/catbee-logger?branch=master
