/**
 * @author Ivaylo Ivanov
 * @public
 * @class Router
 * @description The Router class' job is to set routes and middlewares,
 * to serialize route urls, apply req and res __proto__ and to handle requests.
 * Using "var" for "hot" places since "let" at the moment is slower
 * @requires debug
 */
'use strict';
const debug = require('debug')('esrol-router:router:router');
const request = require('./request');
const response = require('./response');
const querystring = require('querystring');

class Router {

  /**
  * @private
  * @method constructor
  * @description run the  the _initializeProperties
  * @see {@link _initializeProperties}
  */
  constructor() {
    this._initializeProperties();
  }

  /**
  * @public
  * @method setRoutes
  * @description Set a route.
  * @param {object} route - a route object, containing intormation for the route
  */
  setRoutes(routes) {
    debug('Setting new route.');
    this._routes = routes;
  }

  /**
  * @public
  * @method setNamespace
  * @description Set server namespace.
  * @param {string} namespace - eg 'v1' which will evaluate www.example.com/v1
  * @returns {boolean} true
  */
  setNamespace(namespace) {
    debug('Setting namespace.');
    this._namespace = namespace;
    return true;
  }

  /**
  * @public
  * @method setMiddleware
  * @description Set middlewares. Middleware will be called after the router
  * only if there is a route to handle the request.
  * @param {function} middleware - has to have 4 parameters
  * @throws {error} error - if middleware parameter is not a function,
  * or doesn't have 4 parameters
  * @returns {boolean} true - returns true on success
  */
  setMiddleware(middleware) {
    debug('Initializing new middleware.');
    if (typeof middleware !== 'function') {
      throw new Error('middleware must be a function');
    }
    if (middleware.length !== 4) {
      throw new Error('middleware must accept 4 parameters');
    }
    this._middleware = middleware;
    return true;
  }

  /**
  * @public
  * @method onRequest
  * @description Handle a request and route it to the required route.
  * @param {object} req - request
  * @param {object} res - response
  * @returns {mixed} mixed - returns the value from the route // if returned
  */
  onRequest(req, res) {
    debug('Handling request.');
    var routeMethod;
    var serializedObject = this._serializeURL(req.url);
    var url = serializedObject.url.replace(this._namespace, '');
    var requestMethod = req.method.toLowerCase();
    this._setQueryParams(req, serializedObject.queryString);
    // 100% match / for example /test
    if (this._routes[url]) {
      routeMethod = requestMethod + 'MultipleRecords';
    } else {
      // check for route like /test/
      if (url[url.length - 1] === '/') {
        url = url.slice(0, -1);
        // check again for exact match
        if (this._routes[url]) {
          routeMethod = requestMethod + 'MultipleRecords';
        }
      }
      if (!routeMethod) {
        // if there is still no match,
        // check for single record like /test/someRecordName or /test/1
        url = url.split('/');
        req.record = url.pop();
        url = url.join('/');
        if (req.record && this._routes[url]) {
          routeMethod = requestMethod + 'SingleRecord';
        }
      }
    }
    return this._dispatchRequest(req, res, url, routeMethod);
  }

  /**
  * @private
  * @method _serializeURL
  * @description Seralizes a url.
  * @param {string} url - request
  * @returns {object} - the serialized url
  */
  _serializeURL(url) {
    url = url.split('?');
    return {
      url: url[0],
      queryString: url[1] || ''
    };
  }

  /**
  * @private
  * @method _setQueryParams
  * @description Set the request query params object.
  * @param {object} req - request
  * @param {string} string - the query string
  */
  _setQueryParams(req, string) {
    req.query = querystring.parse(string);
  }

  /**
  * @private
  * @method _dispatchRequest
  * @description Handle a request and route it to the required route if there
  * is such.
  * @param {object} req - request
  * @param {object} res - response
  * @param {string} url - requested url
  * @param {string} method - requested method eg: getMultipleRecords
  * for GET posts
  * @returns {mixed} could return the returned value through the middlewares
  * and the route itself
  */
  _dispatchRequest(req, res, url, method) {
    this._changeProto(req, res);
    if (method && this._routes[url].methods[method]) {
      req.routeURL = url;
      req.routeMethod = method;
      return this._middleware(
        req,
        res,
        this._routes[url].methods[method],
        this._routes[url].scope
      );
    }
    if (this._routes['/fourOhFour']
      && typeof this._routes['/fourOhFour'].methods.all === 'function') {
      return this._routes['/fourOhFour'].methods.all.call(
        this._routes['/fourOhFour'].scope,
        req,
        res
      );
    }
    res.statusCode = 404;
    return res.end();
  }

  /**
  * @private
  * @method _changeProto
  * @description Change req and res __proto__ like express.js does.
  * @param {object} req - request
  * @param {object} res - response
  * @see {@link https://github.com/strongloop/express/blob/master/lib/middleware/init.js}
  */
  _changeProto(req, res) {
    req.res = res;
    res.req = req;
    req.__proto__ = request;
    res.__proto__ = response;
  }

  /**
  * @private
  * @method _defaultMiddleware
  * @description Handle a request and route it to the required route.
  * @param {object} req - request
  * @param {object} res - response
  * @param {object} route - the route
  * @param {object} scope - the scope
  * @returns {mixed} returned value through the middlewares and the route itself
  */
  _defaultMiddleware(req, res, route, scope) {
    return route.call(scope, req, res);
  }

  /**
  * @private
  * @method _initializeProperties
  * @description Initializes the properties of the class.
  */
  _initializeProperties() {
    this._middleware = this._defaultMiddleware;
    this._routes = {};
    this._namespace = '';
  }

};

module.exports = Router;
