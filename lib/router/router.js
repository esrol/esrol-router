'use strict';
let Errors = require('esrol-errors');

module.exports = class Router {

  constructor() {
    this._initializeProperties();
    this._factory();
    this._registerErrors();
  }

  setRoutes(routes) {
    this._routes = routes;
  } 

  setMiddleware(middleware) {
    if (typeof middleware !== 'function') {
      this._Errors.error(`${typeof middleware} given`, 1);
    }
    if (middleware.length !== 4) {
      this._Errors.error(`${middleware.length} given`, 2);
    }
    this._middleware = middleware;
    return true;
  }

  onRequest(req, res) {
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

  _serializeURL(url) {
    url = url.split('?');
    return {
      url: url[0],
      queryString: url[1] || ''
    };
  }

  _setRequestQueryString(req, string) {
    req.queryString = string;
  }

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

  _defaultMiddleware(req, res, route, scope) {
    return route.call(scope, req, res);
  } 

  _initializeProperties() {
    this._middleware = this._defaultMiddleware;
    this._routes = {};  
    this._Errors = {};   
  }

  _factory() {
    this._Errors = new Errors();
  }

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
