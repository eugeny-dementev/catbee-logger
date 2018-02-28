const Lab = require('lab');
const lab = (exports.lab = Lab.script());
const { experiment, test, beforeEach } = lab;

const sinon = require('sinon');
const assert = require('assert');

const Logger = require('../dist/BrowserLogger');

experiment('browser/Logger', () => {
  let logger = null;

  beforeEach(() => {
    logger = new Logger();
  });

  experiment('#_transports', () => {
    test('should be an array', () => {
      assert(Array.isArray(logger._transports));
    });
  });

  experiment('#dropTransports', () => {
    test('should drop all currents transports', () => {
      logger.addTransport(() => {});
      logger.addTransport(() => {});
      logger.addTransport(() => {});

      logger.dropTransports();

      assert.deepEqual([], logger._transports);
    });
  });

  experiment('#addTransport', () => {
    test('should add transport', () => {
      logger.dropTransports();

      function transport() {}

      logger.addTransport(transport);

      assert.deepEqual([transport], logger._transports);
    });

    test('should throws if not a function', () => {
      assert.throws(() => logger.addTransport(''), TypeError);
    });
  });

  experiment('#_log', () => {
    test('call all transports', () => {
      const level = 'error';
      const meta = { level };
      const spy = sinon.spy();
      logger.addTransport(spy);
      logger.addTransport(spy);
      logger.addTransport(spy);

      logger._log(level, meta);

      sinon.assert.callCount(spy, 3);
      sinon.assert.calledWith(spy, level, meta);
      sinon.assert.calledWith(spy, level, meta);
      sinon.assert.calledWith(spy, level, meta);
    });
  });
});
