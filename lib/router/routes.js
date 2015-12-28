/**
 * @author Ivaylo Ivanov
 * @public
 * @class Routes
 * @description
 * The Routes class holds methods for registering routes, setting up which
 * methods can access the routes, as well as getting the route length
 * or methods.
 * @requires debug
 * @requires esrol-errors
 */
'use strict';
let debug = require('debug')('esrol-router:router:routes');
let Errors = require('esrol-errors');

module.exports = class Routes {

  /**
  * @private
  * @method constructor
  * @description run the  the _initializeProperties and _registerErrors methods
  * @see {@link _initializeProperties}
  * @see {@link _registerErrors}
  */
  constructor() {
    this._initializeProperties();
    this._registerErrors();
  }

  /**
  * @public
  * @method registerRoute
  * @description This method registers a route. The method is used for setting
  * the route, it's methods, and scope.
  * @param {string} description - description text of the error
  * @param {int} number - the number that the error will have
  * @throws {error} error - if thrown by setErrorWithNumber
  * @returns {array} _routes - all the created routes
  * @see {@link _getRouteMethods}
  */
  registerRoute(route) {
    debug('Registering new route.');
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
      if (route.url === '/fourOhFour' && typeof route.all === 'function') {
        this._routes[route.url].methods = {
          all: route.all
        }
      } else {
        this._Errors.error('Missing methods', 2);
      }
    }
    return this._routes;
  }

  /**
  * @public
  * @method getRoutesLength
  * @description Get number of registered routes.
  * @returns {int} length - all the created routes
  */
  getRoutesLength() {
    debug('Fetching route length.');
    return Object.keys(this._routes).length;
  }

  /**
  * @public
  * @method getRouteMethodsLength
  * @description Get the methods number in a route.
  * @param {string} url - the url destination of the route.
  * @returns {int} length
  */
  getRouteMethodsLength(url) {
    debug('Fetching route methods length.');
    if (!this._routes[url]) {
      return 0;
    }
    return Object.keys(this._routes[url].methods).length;
  }

  /**
  * @public
  * @method setSupportedHttpMethods
  * @description Choose which http methods to be supported.
  * @param {array} methods - array of supported methods for the route
  * @throws {error} error - if the methods array is empty or not an array,
  * an error is thrown
  * @returns {boolean} true - on successful completion
  */
  setSupportedHttpMethods(methods) {
    debug('Setting allowed http methods for route.');
    if (!Array.isArray(methods)) {
      this._Errors.error(`${typeof methods} given`, 1);
    }
    if (!methods.length) {
      this._Errors.error(`Array length: ${methods.length}`, 1);
    }
    this._supportedHttpMethods = methods;
    return true;
  }

  /**
  * @private
  * @method _getRouteMethods
  * @description Get the supported http methods for the route.
  * @param {object} route - the route object
  * @returns {boolean} false - if there are no allowed methods for the route
  * @returns {array} methods - the allowed methods for the route
  */
  _getRouteMethods(route) {
    debug('Fetching route methods.');
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

  /**
  * @private
  * @method _initializeProperties
  * @description Initializes the properties of the class.
  */
  _initializeProperties() {
    this._routes = {};
    this._supportedHttpMethods = [];
    this._Errors = new Errors();
  }

  /**
  * @private
  * @method _registerErrors
  * @description Register errors in the errors class.
  */
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
