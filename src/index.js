const Logger = require('./lib/Logger');

module.exports = {
  /**
   * @param {ServiceLocator} locator
   * @param {Function} locator.register
   */
  register (locator) {
    const config = locator.resolve('config');
    locator.register('logger', Logger, true);

    const bus = locator.resolve('eventBus');
    const logger = locator.resolve('logger');

    bus.on('error', (error) => logger.error(error));
  }
};
