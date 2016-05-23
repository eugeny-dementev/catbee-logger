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

### Enricments
Every log object can be enrich with whatever you want. Just add function for it:
``` js
  // browser.js
  logger.addEnrichment((log, level) => log.from = 'Browser');

  // server.js
  logger.addEnrichment((log, level) => log.from = 'Server');
```

### Transports
Send your log object to every added transports
``` js
  // browser.js
  logger.addTransport((level, log) => {
    // send log to server or any
  });

  // server logger is a winston wrapper and logger.addTransport = winstonLogger.add
  logger.addTransport(grayLog2, grayLogOptions);
```

## eventBus errors
logger in register method automatic subscribe to `error` event in eventBus

[travis-img]: https://travis-ci.org/catbee/catbee-logger.svg?branch=master
[travis-url]: https://travis-ci.org/catbee/catbee-logger

[codecov-img]: https://codecov.io/github/catbee/catbee-logger/coverage.svg?branch=master
[codecov-url]: https://codecov.io/github/catbee/catbee-logger?branch=master
