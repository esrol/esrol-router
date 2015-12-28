/**
 * @public
 * @module Response
 * @description The response object represents the HTTP response like
 * in Express app
 * sends when it gets an HTTP request.
 * Using express response for reference
 * @see {@link https://github.com/strongloop/express/blob/master/lib/response.js}
 * @requires http
 */
'use strict';
let http = require('http');

/**
 * Response prototype.
 */

let res = module.exports = {
  __proto__: http.ServerResponse.prototype
};

/**
 * @public
 * @method status
 * @description Set status `code`.
 * @param {int} code
 * @return {ServerResponse}
 */

res.status = function status(code) {
  this.statusCode = code;
  return this;
};

/**
 * @private
 * @method __send
 * Send a response.
 * @param {string} body
 */

res.__send = function send(body) {
  this.setHeader('Content-Length', body.length);
  this.end(body);
};

/**
 * @public
 * @method json
 * @description Send JSON response.
 *
 * Examples:
 *
 *     res.json(null);
 *     res.json({ foo: 'bar' });
 *
 * @param {mixed} obj
 */

res.json = function json(obj) {
  var body = JSON.stringify(obj, null, 2);
  if (!this.getHeader('Content-Type')) {
    this.setHeader('Content-Type', 'application/json');
  }
  this.__send(body);
};

/**
 * @public
 * @method redirect
 * @description Redirect to the given `url` with status 302
 * @param {string} url
 *
 * Examples:
 *
 *    res.redirect('/foo/bar');
 *    res.redirect('http://example.com');
 *
 */

res.redirect = function redirect(url) {
  this.setHeader('Location', url);
  this.statusCode = 302;
  this.end();
};
