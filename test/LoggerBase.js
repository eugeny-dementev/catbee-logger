const Lab = require('lab');
const lab = exports.lab = Lab.script();
const { experiment, test, afterEach } = lab;

const sinon = require('sinon');
const assert = require('assert');

const LoggerBase = require('../dist/LoggerBase');

experiment('Base', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  experiment('#defaultLevels', () => {
    test('default levels static field', () => {
      assert.deepEqual(LoggerBase.defaultLevels, {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4,
        silly: 5
      });
    });

    test('default level shortcuts functions', () => {
      const logger = new LoggerBase();

      Object
        .keys(LoggerBase.defaultLevels)
        .forEach((level) => assert.equal(typeof logger[level], 'function'));
    });
  });

  experiment('#_enrichments', () => {
    test('should be an array', () => {
      const logger = new LoggerBase();

      assert(Array.isArray(logger._enrichments));
    });

    test('should be empty array by default', () => {
      const logger = new LoggerBase();

      assert.deepEqual([], logger._enrichments);
    });
  });

  experiment('#addEnrichment', () => {
    test('should add enrichment function to _enrichments array', () => {
      const logger = new LoggerBase();

      const another = () => {};

      function enrichment () {}

      logger.addEnrichment(enrichment);
      logger.addEnrichment(another);

      assert.deepEqual([enrichment, another], logger._enrichments);
    });

    test('should throw TypeError if enrichment is not a function', () => {
      const logger = new LoggerBase();

      assert.throws(() => {
        logger.addEnrichment('');
      }, TypeError);
    });
  });

  experiment('#dropEnrichments', () => {
    test('should clean up all current enrichments', () => {
      const logger = new LoggerBase();

      const another = () => {};

      function enrichment () {}

      logger.addEnrichment(enrichment);
      logger.addEnrichment(another);

      logger.dropEnrichments();

      assert.deepEqual([], logger._enrichments);
    });
  });

  experiment('#removeEnrichment', () => {
    test('should delete one enrichment by link on it', () => {
      const logger = new LoggerBase();

      const another = () => {};

      function enrichment () {}

      function enrich () {}

      logger.addEnrichment(enrichment);
      logger.addEnrichment(another);
      logger.addEnrichment(enrich);

      logger.removeEnrichment(another);

      assert.deepEqual([enrichment, enrich], logger._enrichments);
    });
  });

  experiment('#_enrichLog', () => {
    test('should enrich log', () => {
      const logger = new LoggerBase();

      const expected = {
        data: 'some data'
      };

      logger.addEnrichment((log) => {
        log.data = expected.data;
      });

      const log = {};

      logger._enrichLog(log);

      assert.deepEqual(expected, log);
    });
  });

  experiment('#_send', () => {
    test('should prepare, enrich and log', () => {
      const level = 'error';
      const message = 'hello';
      const meta = { one: 1 };

      const logger = new LoggerBase();
      sandbox.stub(logger, '_prepareLog').returns(meta);
      sandbox.stub(logger, '_enrichLog');
      sandbox.stub(logger, '_log');

      logger._send(level, message, meta);

      sinon.assert.calledOnce(logger._prepareLog);
      sinon.assert.calledWith(logger._prepareLog, message, meta);
      sinon.assert.calledOnce(logger._enrichLog);
      sinon.assert.calledWith(logger._enrichLog, meta, level);
      sinon.assert.calledOnce(logger._log);
      sinon.assert.calledWith(logger._log, level, meta);
    });

    test('throw error if ._log method is not realized in inheritor', () => {
      const logger = new LoggerBase();
      sandbox.stub(logger, '_prepareLog');

      assert.throws(() => logger._send(), ReferenceError);
    });

    experiment('level option', () => {
      const levels = Object.keys(LoggerBase.defaultLevels);

      levels
        .forEach((level, index) => {
          test(`${level} level`, () => {
            const logger = new LoggerBase({ level });

            sandbox.stub(logger, '_log');

            levels.forEach((name) => logger[name]('message'));

            sinon.assert.callCount(logger._log, index + 1);
          });
        });
    });
  });

  experiment('#_prepareLog', () => {
    test('logger.error("message")', () => {
      const message = 'hello';

      const logger = new LoggerBase();
      const log = logger._prepareLog(message);

      assert.deepEqual(log, { message });
    });

    test('logger.error("message", { v })', () => {
      const message = 'hello';
      const meta = { v: 'v' };

      const logger = new LoggerBase();
      const log = logger._prepareLog(message, meta);

      assert.deepEqual(log, Object.assign({ message }, meta));
    });

    test('logger.error({ message, v })', () => {
      const message = 'hello';
      const meta = { message, v: 'v' };

      const logger = new LoggerBase();
      const log = logger._prepareLog(meta);

      assert.deepEqual(log, Object.assign(meta));
    });

    test('throw if incorrect input', () => {
      const logger = new LoggerBase();

      assert.throws(() => {
        logger._prepareLog(1);
      }, TypeError);
    });
  });
});

