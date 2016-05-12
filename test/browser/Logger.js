const Lab = require('lab');
const lab = exports.lab = Lab.script();
const { experiment, test, beforeEach } = lab;

const assert = require('assert');
const ServiceLocator = require('catberry-locator');

const Logger = require('../../src/browser/Logger');

experiment('browser/Logger', () => {
  let locator:ServiceLocator = null;
  let logger:Logger = null;

  beforeEach((done) => {
    locator = new ServiceLocator();
    locator.registerInstance('serviceLocator', locator);
    locator.registerInstance('config', {});
    locator.register('logger', Logger, true);
    logger = locator.resolve('logger');

    done();
  });

  experiment('#_transports', () => {
    test('should be an array', (done) => {
      assert(Array.isArray(logger._transports));

      done();
    });
  });

  experiment('#dropTransports', () => {
    test('should drop all currents transports', (done) => {
      logger.addTransport(() => {});
      logger.addTransport(() => {});
      logger.addTransport(() => {});

      logger.dropTransports();

      assert.deepEqual([], logger._transports);

      done();
    });
  });

  experiment('#addTransport', () => {
    test('should add transport', (done) => {
      logger.dropTransports();

      function transport () {}

      logger.addTransport(transport);

      assert.deepEqual([transport], logger._transports);

      done();
    });

    test('should throws if not a function', (done) => {
      assert.throws(() => logger.addTransport(''), TypeError);

      done();
    });
  });

  experiment('#fatal', () => {
    test('should send message to _error', (done) => {
      const messageString = 'message';
      const metaObject = { h: 0 };

      logger._error = (level, message, meta) => {
        assert.equal('fatal', level);
        assert.equal(messageString, message);
        assert.deepEqual(metaObject, meta);

        done();
      };

      logger.fatal(messageString, metaObject);
    });

    test('should send object in meta if not presented', (done) => {
      logger._error = (level, message, meta) => {
        assert.deepEqual({}, meta);

        done();
      };

      logger.fatal('anything message');
    });

    test('should not send log if logger._levels.fatal == false', (done) => {
      let sendStatus = false;

      logger._levels.fatal = false;

      logger._error = () => {
        sendStatus = true;
      };

      logger.fatal('anything message');

      assert.equal(false, sendStatus);

      done();
    });
  });

  experiment('#error', () => {
    test('should send message to _error', (done) => {
      const messageString = 'message';
      const metaObject = { h: 0 };

      logger._error = (level, message, meta) => {
        assert.equal('error', level);
        assert.equal(messageString, message);
        assert.deepEqual(metaObject, meta);

        done();
      };

      logger.error(messageString, metaObject);
    });

    test('should send object in meta if not presented', (done) => {
      logger._error = (level, message, meta) => {
        assert.deepEqual({}, meta);

        done();
      };

      logger.error('anything message');
    });

    test('should not send log if logger._levels.error == false', (done) => {
      let sendStatus = false;

      logger._levels.error = false;

      logger._error = () => {
        sendStatus = true;
      };

      logger.error('anything message');

      assert.equal(false, sendStatus);

      done();
    });
  });

  experiment('#warn', () => {
    test('should send message to _message', (done) => {
      const messageString = 'message';
      const metaObject = { h: 0 };

      logger._message = (level, message, meta) => {
        assert.equal('warn', level);
        assert.equal(messageString, message);
        assert.deepEqual(metaObject, meta);

        done();
      };

      logger.warn(messageString, metaObject);
    });

    test('should send object in meta if not presented', (done) => {
      logger._message = (level, message, meta) => {
        assert.deepEqual({}, meta);

        done();
      };

      logger.warn('anything message');
    });

    test('should not send log if logger._levels.warn == false', (done) => {
      let sendStatus = false;

      logger._levels.warn = false;

      logger._message = () => {
        sendStatus = true;
      };

      logger.warn('anything message');

      assert.equal(false, sendStatus);

      done();
    });
  });

  experiment('#info', () => {
    test('should send message to _message', (done) => {
      const messageString = 'message';
      const metaObject = { h: 0 };

      logger._message = (level, message, meta) => {
        assert.equal('info', level);
        assert.equal(messageString, message);
        assert.deepEqual(metaObject, meta);

        done();
      };

      logger.info(messageString, metaObject);
    });

    test('should send object in meta if not presented', (done) => {
      logger._message = (level, message, meta) => {
        assert.deepEqual({}, meta);

        done();
      };

      logger.info('anything message');
    });

    test('should not send log if logger._levels.info == false', (done) => {
      let sendStatus = false;

      logger._levels.info = false;

      logger._message = () => {
        sendStatus = true;
      };

      logger.info('anything message');

      assert.equal(false, sendStatus);

      done();
    });
  });

  experiment('#debug', () => {
    test('should send message to _message', (done) => {
      const messageString = 'message';
      const metaObject = { h: 0 };

      logger._message = (level, message, meta) => {
        assert.equal('debug', level);
        assert.equal(messageString, message);
        assert.deepEqual(metaObject, meta);

        done();
      };

      logger.debug(messageString, metaObject);
    });

    test('should send object in meta if not presented', (done) => {
      logger._message = (level, message, meta) => {
        assert.deepEqual({}, meta);

        done();
      };

      logger.debug('anything message');
    });

    test('should not send log if logger._levels.debug == false', (done) => {
      let sendStatus = false;

      logger._levels.debug = false;

      logger._message = () => {
        sendStatus = true;
      };

      logger.debug('anything message');

      assert.equal(false, sendStatus);

      done();
    });
  });

  experiment('#trace', () => {
    test('should send message to _message', (done) => {
      const messageString = 'message';
      const metaObject = { h: 0 };

      logger._message = (level, message, meta) => {
        assert.equal('trace', level);
        assert.equal(messageString, message);
        assert.deepEqual(metaObject, meta);

        done();
      };

      logger.trace(messageString, metaObject);
    });

    test('should send object in meta if not presented', (done) => {
      logger._message = (level, message, meta) => {
        assert.deepEqual({}, meta);

        done();
      };

      logger.trace('anything message');
    });

    test('should not send log if logger._levels.trace == false', (done) => {
      let sendStatus = false;

      logger._levels.trace = false;

      logger._message = () => {
        sendStatus = true;
      };

      logger.trace('anything message');

      assert.equal(false, sendStatus);

      done();
    });
  });
});
