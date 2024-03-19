const x11hash = require('@dashevo/x11-hash-js');
const crypto = require('crypto');
const Yescrypt = require('wasm-yescryptr32-hash');
/**
 * @typedef {X11Hash} X11Hash
 * @property {Object} errors
 * @property {function((string|Array|buffer), number, number): (string|Array)} digest
 */

/**
 * @typedef {Crypto} Crypto
 * @property {function(string, HashOptions): Hash} createHash
 */

/**
 * @typedef {UnfyCoreLibConfiguration} UnfyCoreLibConfiguration
 * @property {X11Hash} [x11hash]
 * @property {Crypto} [crypto]
 */
const configuration = {
  crypto
};

/**
 * Configures UnfyCore library
 * @param {UnfyCoreLibConfiguration} config
 */
const configure = async (config) => {
  yescrypt = await Yescrypt();
  Object.assign(configuration, { yescrypt, ...config });
}

module.exports = {
  configuration,
  configure
}
