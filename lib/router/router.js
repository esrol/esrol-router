/**
 * @author Ivaylo Ivanov
 * @public
 * @class Router
 * @description The Router class' job is to set routes and middlewares,
 * to serialize route urls, and to handle requests.
 * @requires debug
 * @requires esrol-errors
 */
'use strict';
let debug = require('debug')('esrol-router:router/router');
let Errors = require('esrol-errors');

module.exports = class Router {

  /**
  * @public
  * @method constructor
  * @description run the  the _initializeProperties, _factory,
  * and _registerErrors methods
  * @see {@link _initializeProperties}
  * @see {@link _factory}
  * @see {@link _registerErrors}
  */
  constructor() {
    this._initializeProperties();
    this._factory();
    this._registerErrors();
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
  * @method setMiddleware
  * @description Initialise middlewares.
  * @param {function} middleware - has to have 4 parameters
  * @throws {error} error - if middleware parameter is not a function,
  * or doesn't have 4 parameters
  * @returns {boolean} true - returns true on success
  */
  setMiddleware(middleware) {
    debug('Initializing new middleware.');
    if (typeof middleware !== 'function') {
      this._Errors.error(`${typeof middleware} given`, 1);
    }
    if (middleware.length !== 4) {
      this._Errors.error(`${middleware.length} given`, 2);
    }
    this._middleware = middleware;
    return true;
  }

  /**
  * @public
  * @method onRequest
  * @description Handle a request and route it to the required router.
  * @param {object} req - request
  * @param {object} res - response
  * @returns {object} middleware - returns the instantiated middleware
  */
  onRequest(req, res) {
    debug('Handling request.');
    var routeMethod;
    var serializedObject = this._serializeURL(req.url);
    var url = serializedObject.url;
    var requestMethod = req.method.toLowerCase();
    this._setRequestQueryString(req, serializedObject.queryString);
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
        if (this._routes[url]) {
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
  * @method _setRequestQueryString
  * @description Set the request query string.
  * @param {object} req - request
  * @param {string} string - the query string
  */
  _setRequestQueryString(req, string) {
    req.queryString = string;
  }

  /**
  * @private
  * @method _dispatchRequest
  * @description Handle a request and route it to the required router.
  * @param {object} req - request
  * @param {object} res - response
  * @returns {object} _middleware - the instance of the loaded middleware
  * @returns {method} res.end - ends the response process if
  * middleware has not been found
  */
  _dispatchRequest(req, res, url, method) {
    if (method && this._routes[url].methods[method]) {
      return this._middleware(
        req,
        res,
        this._routes[url].methods[method],
        this._routes[url].scope
      );
    }
    res.statusCode = 404;
    return res.end();
  }

  /**
  * @private
  * @method _defaultMiddleware
  * @description Handle a request and route it to the required router.
  * @param {object} req - request
  * @param {object} res - response
  * @param {object} route - the route
  * @param {object} scope - the scope
  * @returns {object} middleware - returns the instantiated middleware
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
    this._Errors = {};
  }

  /**
  * @private
  * @method _factory
  * @description Instantiate the errors class.
  */
  _factory() {
    this._Errors = new Errors();
  }

  /**
  * @private
  * @method _registerErrors
  * @description Register errors in the errors class.
  */
  _registerErrors() {
    this._Errors.registerErrorWithNumber(
      'setMiddleware expects function as an argument, which will be called on'
      + ' successful request. Successful request is when request can be handled'
      + ' by route. Caused in esrol-router module, class Router',
      1
    );
    this._Errors.registerErrorWithNumber(
      'The middleware function passed to setMiddleware must expects exactly'
      + ' 4 params: req, res, route, scope. The route in this case is the'
      + ' method that will handle the request.'
      + ' Caused in esrol-router module, class Router',
      2
    );
  }

};
