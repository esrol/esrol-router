'use strict';
let Errors = require('xena-errors');

module.exports = class Router extends Errors {

  constructor() {
    super();
    this._initializeProperties();
  }

  setRoutes(routes) {
    this._routes = routes;
  } 

  setMiddleware(middleware) {
    if (typeof middleware !== 'function') {
      throw new Error('Middleware is not a function');
      // TODO replace this with this.errorByNumber(10); 
    }
    if (middleware.length !== 4) {
      throw new Error('Middleware should expect exactly 4 params');
      // TODO replace this with this.errorByNumber(11); 
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
    // this._setPrototypes(req, res);
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

  _initializeProperties() {
    this._middleware = this._defaultMiddleware;
    this._routes = {};    
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

};
