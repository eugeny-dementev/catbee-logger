/* eslint no-console:0 */
const LoggerBase = require('../lib/base/LoggerBase');

/**
 * Creates browser logger.
 *
 * @param {ServiceLocator} $serviceLocator
 * @constructor
 */
class Logger extends LoggerBase {
  constructor (options = {}) {
    super(options);

    /**
     * Browser logger transports.
     *
     * @type {Array}
     * @private
     */
    this._transports = [];

    this.onerror = this.onerror.bind(this);
  }

  /**
   * Add log messages transport.
   *
   * @param {function} transport
   */
  addTransport (transport) {
    if (typeof transport !== 'function') {
      throw new TypeError('Transport must be a function');
    }

    this._transports.push(transport);
  }

  /**
   * Add log messages transport.
   *
   * @param {function} transport
   */
  removeTransport (transport) {
    const index = this._transports.indexOf(transport);

    if (index === -1) {
      this.info('Transport not found. Remove nothing');
      return;
    }

    this._transports.splice(index, 1);
  }

  dropTransports () {
    this._transports = [];
  }

  bindWindowListener () {
    window.addEventListener('error', this.onerror);
  }

  /**
   * Window error event handler.
   *
   * @param {ErrorEvent} error
   * @param {String} message
   * @param {Number} lineno - line number
   * @param {Number} colno - column number
   * @param {String} filename - script
   */
  onerror ({ message, filename, lineno, colno, error }) {
    this._send('error', message, {
      stack: error.stack,
      filename: filename,
      line: `${lineno}:${colno}`
    });
  }

  /**
   * Entry point for browser logs.
   * Executes from LoggerBase.
   *
   * @param {string} level
   * @param {Object} log
   */
  _log (level, log) {
    this._transports.forEach((transport) => transport(level, log));
  }
}

module.exports = Logger;
