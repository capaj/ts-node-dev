const util = require('util');
const fmt = require('dateformat');

const colors = {
  info: '36',
  error: '31;1',
  warn: '33',
  debug: '90'
};

/**
 * Logs a message to the console. The level is displayed in ANSI colors,
 * either bright red in case of an error or green otherwise.
 */
module.exports = function (cfg) {

  function log(msg, level) {
    if (cfg.timestamp) msg = color(fmt(cfg.timestamp), '30;1') + ' ' + msg;
    const c = colors[level.toLowerCase()] || '32';
    console.log('[' + color(level.toUpperCase(), c) + '] ' + msg);
  }

  function color(s, c) {
    if (process.stdout.isTTY) {
      return '\x1B[' + c + 'm' + s + '\x1B[0m';
    }
    return s;
  }

  log.debug = function () {
    if (!cfg.debug) return
    log(util.format.apply(util, arguments), 'debug');
  };

  log.info = function () {
    log(util.format.apply(util, arguments), 'info');
  };

  log.warn = function () {
    log(util.format.apply(util, arguments), 'warn');
  };

  log.error = function () {
    log(util.format.apply(util, arguments), 'error');
  };

  return log;
};
