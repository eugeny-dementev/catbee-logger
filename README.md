# shlyager

Isomorphic wrapper for winston with transports and enrichments

## Installation

```
  npm install shlyager
```

## Usage

### Browser

```js
const Logger = require("shlyager");

const logger = new Logger();

logger.addEnrichment(log => (log.from = "Browser"));

// Possible way to send logs to server
logger.addTransport((level, log) => {
  request.post("/log", { level, log });
});

// Gather browser errors
logger.bindWindowListener();
```

### Server

```js
const Logger = require("shlyager");
const winston = require("winston");

const logger = new Logger();

logger.addEnrichment(log => (log.from = "Server"));

logger.addTransport(winston.transports.Console);

// Possible way to receive logs on server
expressApp.post("/log", (res, req) => {
  logger.retranslate(req.body.level, req.body.log);
});
```

## API

### Common

#### new Logger([options])

##### options

Type: `Object`

###### options.levels

Type: `Object`<br>
Default: `{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }`

Keys from this object will be used to create log methods for each level (`logger.error`, `logger.warn`, ...)

###### options.level

Type: `string`<br>
Default: `warn`

Defines levels which will be logged. Equal or lower value will pass. This option has higher priority then same option for winston transports

#### logger.addEnrichment(enrichment)

##### enrichment

Type: `Function`<br>
Arguments: `(log: Object, level: string)`

Enrichment can add or modify values in passed log object. Return value is ignored

#### logger.removeEnrichment(enrichment)

Remove enrichment (only by reference)

#### logger.dropEnrichments()

Remove all added enrichments

#### logger.dropTransports()

Remove all currently added transports

### Server

#### logger.addTransport(...) logger.removeTransport(...)

Bindings for `winstonLogger.add` and `winstonLogger.remove`

### Browser

#### logger.addTransport(transport)

##### transport

Type: `Function`<br>
Arguments: `(level: string, log: Object)`

#### logger.removeTransport(transport)

Remove transport (only by reference)
