const Lab = require('lab');
const lab = exports.lab = Lab.script();
const { experiment, test, beforeEach } = lab;

const assert = require('assert');

const Logger = require('../../lib/Logger');

experiment('./lib/Logger', () => {
  let logger = null;

  beforeEach(() => {
    logger = new Logger();
  });

  experiment('#retranslate', () => {
    test('', () => {
      assert.strictEqual(logger.retranslate, logger._log);
    });
  });
});
