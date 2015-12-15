/**
 * @public
 * @module Response
 * @description The response object represents the HTTP response that an Express app
 * sends when it gets an HTTP request.
 * Using "var" for "hot" places since "let" at the moment is slower
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
 * @param {Number} code
 * @return {ServerResponse}
 */

res.status = function status(code) {
  this.statusCode = code;
  return this;
};

/**
 * @private
 * @method _send
 * Send a response.
 * @param {string} body
 */

res.__send = function send(body) {
  var req = this.req;
  this.setHeader('Content-Length', body.length);
  // freshness
  if (req.fresh) {
    this.statusCode = 304;
  }
  // strip irrelevant headers
  if (this.statusCode === 204 || this.statusCode === 304) {
    this.removeHeader('Content-Type');
    this.removeHeader('Content-Length');
    this.removeHeader('Transfer-Encoding');
    body = '';
  }
  if (req.method === 'HEAD') {
    this.end();
  } else {
    this.end(body);
  }
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
 * @param {string|number|boolean|object} obj
 */

res.json = function json(obj) {
  var body = JSON.stringify(obj, null, 2);
  if (!this.getHeader('Content-Type')) {
    this.setHeader('Content-Type', 'application/json');
  }
  return this.__send(body);
};

/**
 * @public
 * @method redirect
 * @description Redirect to the given `url` with optional response `status`
 * defaulting to 302.
 *
 * Examples:
 *
 *    res.redirect('/foo/bar');
 *    res.redirect('http://example.com');
 *    res.redirect(301, 'http://example.com');
 *    res.redirect('../login'); // /blog/post/1 -> /blog/login
 *
 */

res.redirect = function redirect(url) {
  this.setHeader('Location', url);
  this.statusCode = 302;
  this.end();
};
