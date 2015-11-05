'use strict';
module.exports = class Router {

  constructor() {
    this._initializeProperties();
  }

  onRequest(req, res) {
    var routeMethod;
    var serializedObject = this._serializeURL(req.url);
    var url = serializedObject.url;
    var reqMethod = req.method.toLowerCase();
    this._setRequestQueryString(serializedObject.queryString);
    // 100% match / for example hello-world
    if (this._routes[url]) {
      routeMethod = reqMethod + 'MultipleRecords';
    } else {
      routeMethod = this._findRouteMethodForReq(req, url);
    }
    // this._setPrototypes(req, res);
    return this._dispatchRequest(req, res, url, method);    
  }

  _serializeURL(url) {
    url = url.split('?');
    return {
      url: url[0],
      queryString: url[1]
    };
  }

  _setRequestQueryString(req, string) {
    req.queryString = string;
  }

  _findRouteMethodForReq(req, url) {
    // check for route like /hello-world/
    if (url[url.length - 1] === '/') {
      url = url.slice(0, -1); 
      // check again for exact match
      if (this._routes[url]) {
        // Oops, we have req for multiple records
        return reqMethod + 'MultipleRecords';
      }
    }
    return this._findRouteMethodForSingleRecord(req, url);
  }

  _findRouteMethodForSingleRecord(req, res) {
    url = url.split('/')
    req.record = url.pop();
    url = url.join('/');
    if (this._routes[url]) {
      return reqMethod + 'SingleRecord';         
    } 
    req.record = undefined;    
  }

  _initializeProperties() {
    this._middleware = null;
    this._routes = [];    
  }

  _dispatchRequest(req, res, url, method) {

  }



};
