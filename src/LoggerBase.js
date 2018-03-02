const serializeError = require("serialize-error");

/**
 * Basic functionality for loggers
 *
 * @abstract
 * @class
 * */
class LoggerBase {
  constructor(options) {
    this._config = options || {};
    this._levels = this._config.levels || LoggerBase.defaultLevels;
    this._level = this._config.level || "warn";

    this._prepareShortcuts();

    /**
     * List of log message enrichments
     *
     * @type {Array<function>}
     * @private
     */
    this._enrichments = [];
  }

  static get defaultLevels() {
    return {
      error: 0,
      warn: 1,
      info: 2,
      verbose: 3,
      debug: 4,
      silly: 5
    };
  }

  /**
   * Add log message enrichment.
   * Enrichments is a function which executed with log object for enrich him.
   *
   * @example: function enrichment (logObject) {
   *   logObject.session = cookie.session_token
   * }
   *
   * @param {function} enrichment
   */
  addEnrichment(enrichment) {
    if (typeof enrichment !== "function") {
      throw new TypeError("Enrichment must be a function");
    }

    this._enrichments.push(enrichment);
  }

  /**
   * Remove single enrichment.
   *
   * @param {function} enrichment
   */
  removeEnrichment(enrichment) {
    const index = this._enrichments.indexOf(enrichment);

    if (index === -1) {
      this.log("info", "Enrichment not found. Remove nothing");
      return;
    }

    this._enrichments.splice(index, 1);
  }

  /**
   * Drop all current log message enrichments.
   */
  dropEnrichments() {
    this._enrichments = [];
  }

  /**
   * Apply all enrichments to log object.
   *
   * @param {Object} log
   * @param {string} level
   * @protected
   */
  _enrichLog(log, level) {
    this._enrichments.forEach(enrich => enrich(log, level));
  }

  /**
   * Enrich log message and send to log(level, log) method which must be realized by
   * inheritor.
   *
   * @param {string} level
   * @param {string} message
   * @param {Object} meta
   * @protected
   */
  _send(level, message, meta) {
    if (this._levels[level] > this._levels[this._level]) {
      return;
    }

    const log = this._prepareLog(message, meta);

    this._enrichLog(log, level);

    this._log(level, log);
  }

  _prepareLog(message, meta = {}) {
    const log = {};
    if (message instanceof Error) {
      Object.assign(log, serializeError(message));
    } else if (message && typeof message === "object") {
      Object.assign(log, message);
    } else if (typeof message === "string") {
      Object.assign(log, { message }, meta);
    } else {
      throw new TypeError("Wrong arguments");
    }

    return log;
  }

  _log() {
    throw new ReferenceError(
      "Logger must realize log(level: string, log: Object) method"
    );
  }

  _prepareShortcuts() {
    Object.keys(this._levels).forEach(level => {
      this[level] = (message, meta) => this._send(level, message, meta);
    });
  }
}

module.exports = LoggerBase;
