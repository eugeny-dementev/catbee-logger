const Logger = require('./dist/lib/Logger');

module.exports = {
  /**
   * @param {ServiceLocator} locator
   * @param {Function} locator.register
   */
  register (locator) {
    const config = locator.resolve('config');

    locator.register('logger', Logger, config, true);
  }
};
