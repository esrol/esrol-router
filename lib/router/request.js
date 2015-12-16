/**
 * @public
 * @module Request
 * @description The request object represents the HTTP request
 * Using express request for reference
 * @see {@link https://github.com/strongloop/express/blob/master/lib/request.js}
 * @requires http
 * @requires parseurl
 */
'use strict';
let http = require('http');
let parse = require('parseurl');

/**
 * Request prototype.
 */

let req = exports = module.exports = {
  __proto__: http.IncomingMessage.prototype
};


/**
 * @public
 * @property path
 * @description Short-hand for `url.parse(req.url).pathname`.
 * @return {String}
 */

defineGetter(req, 'path', function path() {
  return parse(this).pathname;
});

/**
 * @public
 * @property xhr
 * @description Check if the request was an _XMLHttpRequest_.
 * @return {Boolean}
 */

defineGetter(req, 'xhr', function xhr() {
  var val = this.headers['X-Requested-With'] || '';
  return val.toLowerCase() === 'xmlhttprequest';
});

/**
 * @private
 * @method defineGetter
 * @description Helper function for creating a getter on an object.
 * @param {Object} obj
 * @param {String} name
 * @param {Function} getter
 */
function defineGetter(obj, name, getter) {
  Object.defineProperty(obj, name, {
    configurable: true,
    enumerable: true,
    get: getter
  });
}
