/**
 * @author Ivaylo Ivanov
 * @public
 * @class Routes
 * @description
 * The Routes class holds methods for registering routes, setting up which
 * methods can access the routes, as well as getting the route length
 * or methods.
 * @requires debug
 */
'use strict';
const debug = require('debug')('esrol-router:router:routes');

module.exports = class Routes {

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
  * @method registerRoute
  * @description This method registers a route. The method is used for setting
  * the route, it's methods, and scope.
  * @param {string} description - description text of the error
  * @param {int} number - the number that the error will have
  * @throws {error} error
  * @returns {array} _routes - all the created routes
  * @see {@link _getRouteMethods}
  */
  registerRoute(route) {
    debug('Registering new route.');
    if (!route) {
      throw new Error('route must be a function');
    }
    if (!route.url) {
      throw new Error('route must have an url property');
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
        throw new Error('route has no methods to handle requets');
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
    if (!Array.isArray(methods) || !methods.length) {
      throw new Error('setSupportedHttpMethods expects a not empty array');
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
  }

};
