# catbee-logger

[![Build Status][travis-img]][travis-url]
[![Code Coverage][codecov-img]][codecov-url]

Logger for catbee with enrichments and transports

## Installation
``` 
  npm install catbee-logger 
```

## Usage

``` js
const loggerService = require('catbee-logger');
loggerService.register(serviceLocator);

const logger = serviceLocator.resolve('logger');
```

### Send log messages

``` js
logger.error('Error message');
logger.error('Error message', { one: '1', two: 3 });
logger.error(new Error('message')); // for stack trace

logger.fatal('Fatal message', { woooow: 'wat?' });
logger.fatal('Fatal message', { woooow: 'wat?' });
logger.fatal(new Error('Fatal error')); // for stack trace

// only fatal and error methods can take Error instance as a first arguments

logger.debug('message', { one: '1', two: 3 });
logger.trace('message', { one: '1', two: 3 });
logger.info('message', { one: '1', two: 3 });
logger.warn('message', { one: '1', two: 3 });
```

### Enricments
Every log object can be enrich and unenrich. All enrichments are just function with log object in first argument and current message log level in second.
``` js
const enrichment = (log, level) => log.from = 'Browser';
logger.addEnrichment(enrichment);
logger.removeEnrichment(enrichment);
logger.dropEnrichments(); // remove all enrichments
```

### Transports
Send your log object to every added transports. Transports in browser is functions with log level in first argument and log object in second. Server transports are [transports for winston logger](https://github.com/winstonjs/winston/blob/master/docs/transports.md)
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

## Errors
Catbee inself have event bus for system information event, which includes `error` event. logger in register method automatic subscribe to `error` event.

[travis-img]: https://travis-ci.org/catbee/catbee-logger.svg?branch=master
[travis-url]: https://travis-ci.org/catbee/catbee-logger

[codecov-img]: https://codecov.io/github/catbee/catbee-logger/coverage.svg?branch=master
[codecov-url]: https://codecov.io/github/catbee/catbee-logger?branch=master
