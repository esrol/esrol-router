/**
 * @public
 * @module Request
 * @description The request object represents the HTTP request
 * and has properties for the request query string, parameters, body,
 * HTTP headers, and so on.
 * Using "var" for "hot" places since "let" at the moment is slower
 * Using express request for reference
 * @see {@link https://github.com/strongloop/express/blob/master/lib/request.js}
 * @requires http
 * @requires fresh
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
 * @method defineGetter
 * @description Short-hand for `url.parse(req.url).pathname`.
 * @param {object} req - request
 * @param {string} path - path
 * @return {String}
 */

defineGetter(req, 'path', function path() {
  return parse(this).pathname;
});

/**
 * @public
 * @method defineGetter
 * @description Check if the request was an _XMLHttpRequest_.
 * @param {object} req - request
 * @param {string} xhr - xhr
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
