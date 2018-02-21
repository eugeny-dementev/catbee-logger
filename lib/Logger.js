const winston = require('winston');
const LoggerBase = require('./base/LoggerBase');

/**
 * Creates server logger.
 *
 * @param {ServiceLocator} $serviceLocator
 * @class
 */
class Logger extends LoggerBase {
  constructor (options = {}) {
    super(options);

    this._logger = new winston.Logger(options);

    /**
     * Native winston interface for add/remove transports.
     */
    this.addTransport = this._logger.add.bind(this._logger);
    this.removeTransport = this._logger.remove.bind(this._logger);

    /**
     * Entry point for server logs.
     * Executes from LoggerBase.
     */
    this._log = this._logger.log.bind(this._logger);
    this.retranslate = this._log;
  }

  dropTransports () {
    Object
      .keys(this._logger.transports)
      .forEach((transport) => this.removeTransport(transport));
  }
}

module.exports = Logger;
