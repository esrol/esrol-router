'use strict';
let Errors = require('./errors');
module.exports = class Routes extends Errors {
  
  constructor() {
    super();
    this._initializeProperties();
  }

  registerRoute(route) {
    if (!route || !route.url) {
      throw new Error('"registerRoute" expect route object with url property');
    }
    this._routes[route.url] = {};
    this._routes[route.url].methods = this._getRouteMethods(route);
    this._routes[route.url].scope = route;
    return true;
  }

  getRoutesLength() {
    return Object.keys(this._routes).length;
  } 

  getRouteMethodsLength(url) {
    if (!this._routes[url]) {
      return 0;
    }
    return Object.keys(this._routes[url].methods).length;
  }

  setSupportedHttpMethods(methods) {
    if (!Array.isArray(methods)) {
      let e = `"setSupportedMethods" expect array with http method names, but
        ${typeof method} given`;
      throw new Error(e);
    }
    if (!methods.length) {
      let e = '"setSupportedMethods" expect array with at least one method';
      throw new Error(e);
    }
    this._supportedHttpMethods = methods;
    return true;
  }

  _getRouteMethods(route) {
    let methods = {};
    let sm = this._supportedHttpMethods;
    let length = sm.length;
    // this.debug('Getting "methods" for route "%s"', name);    
    for (let i = 0; i < length; i++) {
      let type = sm[i].toLowerCase();
      let single = type + 'SingleRecord';
      let multiple = type + 'MultipleRecords';
      if (typeof route[single] === 'function') {
        methods[single] = route[single];
      }
      if (typeof route[multiple] === 'function') {
        methods[multiple] = route[multiple];
      }     
    }
    if (!Object.keys(methods).length) {
      let e = `Route for "${route.url}" doesn't have any request methods`;
      throw new Error(e);
    }
    return methods;    
  } 

  _initializeProperties() {
    this._routes = {};    
    this._supportedHttpMethods = [];        
  }
};
