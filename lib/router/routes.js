'use strict';
let Errors = require('esrol-errors');

module.exports = class Routes {
  
  constructor() {
    this._initializeProperties();
    this._factory();
    this._registerErrors();    
  }

  registerRoute(route) {
    if (!route) {
      this._Errors.error(`${typeof route} given`, 2);
    }
    if (!route.url) {
      this._Errors.error(`${typeof route.url} given`, 2);      
    }
    this._routes[route.url] = {};
    this._routes[route.url].methods = this._getRouteMethods(route);
    this._routes[route.url].scope = route;
    if (!this._routes[route.url].methods) {
      this._Errors.error('Missing methods', 2);            
    }
    return this._routes;
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
      this._Errors.error(`${typeof methods} given`, 1);
    }
    if (!methods.length) {
      this._Errors.error(`Array length: ${methods.length}`, 1);
    }
    this._supportedHttpMethods = methods;
    return true;
  }

  _getRouteMethods(route) {
    let methods = {};
    let sm = this._supportedHttpMethods;
    let length = sm.length;
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
      return false;      
    }
    return methods;    
  } 

  _initializeProperties() {
    this._routes = {};    
    this._supportedHttpMethods = [];   
    this._Errors = {};     
  }

  _factory() {
    this._Errors = new Errors();
  }

  _registerErrors() {
    this._Errors.registerErrorWithNumber(
      'setSupportedHttpMethods expects array param with http methods as elements'
      + '. For example: ["GET", "POST", "PUT", "DELETE"].'
      + ' Caused in esrol-router module, class Routes',
      1
    );  
    this._Errors.registerErrorWithNumber(
      'registerRoute expects object that has: 1) url property holding request'
      + ' endpoint as a string. For example: "/posts". 2) At least one method,'
      + ' which will handle the request. For example, if you want to handle a'
      + ' a GET request like www.example.com/posts, you need to have a method'
      + ' named "getMultipleRecords". If it\'s a post request to'
      + ' www.example.com/posts/1 you need to have a method'
      + ' named "postSingleRecord".'
      + ' Caused in esrol-router module, class Routes',
      2
    );      
  }
  
};
