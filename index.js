const Logger = require('./lib/Logger');

module.exports = {
  /**
   * @param {ServiceLocator} locator
   * @param {Function} locator.register
   */
  register (locator) {
    locator.register('logger', Logger, true);

    const eventBus = locator.resolve('eventBus');
    const logger = locator.resolve('logger');

    eventBus
      .on('error', (error) => logger.error(error))
      .on('serverRequest', ({ requestInfo = {} }) => {
        const { method, uriPath, address, port } = requestInfo;

        logger.trace(`Request to ${method} "${uriPath}" from ${address}:${port}`);
      })
      .on('serverRequestFinish', ({ requestInfo = {}, requestDuration = -1 }) => {
        const { method, uriPath, address, port } = requestInfo;

        logger.trace(`Response from ${method} "${uriPath}" to ${address}:${port} (${requestDuration})`);
      });
  }
};
