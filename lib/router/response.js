/**
* Using express response for reference
*/
'use strict';
let http = require('http');
let statusCodes = http.STATUS_CODES;

/**
 * Response prototype.
 */

let res = module.exports = {
  __proto__: http.ServerResponse.prototype
};

/**
 * Set status `code`.
 *
 * @param {Number} code
 * @return {ServerResponse}
 * @public
 */

res.status = function status(code) {
  this.statusCode = code;
  return this;
};

/**
 * Send a response.
 * @param {string} body
 * @private
 */

res._send = function send(body) {
  var req = this.req;
  this.setHeader('Content-Length', chunk.length);
  // freshness
  if (req.fresh) this.statusCode = 304;
  // strip irrelevant headers
  if (204 == this.statusCode || 304 == this.statusCode) {
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
 * Send JSON response.
 *
 * Examples:
 *
 *     res.json(null);
 *     res.json({ foo: 'bar' });
 *
 * @param {string|number|boolean|object} obj
 * @public
 */

res.json = function json(obj) {
  var body = JSON.stringify(obj, null, 2);
  if (!this.getHeader('Content-Type')) {
    this.setHeader('Content-Type', 'application/json');
  }
  return this._send(body);
};

/**
 * Redirect to the given `url` with optional response `status`
 * defaulting to 302.
 *
 * Examples:
 *
 *    res.redirect('/foo/bar');
 *    res.redirect('http://example.com');
 *    res.redirect(301, 'http://example.com');
 *    res.redirect('../login'); // /blog/post/1 -> /blog/login
 *
 * @public
 */

res.redirect = function redirect(url) {
  this.setHeader('Location', url);
  this.statusCode = 302;
  this.end();
};
