/**
 * @author Ivaylo Ivanov
 * @public
 * @class Api
 * @description This is the main class Api of the esrol-routers module.
 * Here you can create new routes, set allowed ways of reaching them,
 * handle responses, get information regarding those routes, and
 * set middlewares.
 * @requires debug
 * @requires router
 * @requires routes
 */
'use strict';
let debug = require('debug')('esrol-router:api');
let Router = require('./router/router');
let Routes = require('./router/routes');
let factory = new WeakMap();

module.exports = class Api {

  /**
  * @public
  * @method constructor
  * @description run the private _factory method
  * @see {@link _factory}
  */
  constructor() {
    this._factory();
  }

  /**
  * @public
  * @method setErrorWithNumber
  * @description Add an error message and corresponding number to the registry.
  * @param {object} route - a route object, containing intormation for the route
  * @throws {error} - throws error if thrown by registerRoute in Routes
  * @returns {boolean} true - returns true if registering was successful
  * @see {@link registerRoute}
  */
  registerRoute(route) {
    let routes = factory.Routes.registerRoute(route);
    factory.Router.setRoutes(routes);
    return true;
  }

  /**
  * @public
  * @method getRoutesLength
  * @description Get the ammount of registered routes.
  * @returns {int} - ammount of registered routes
  * @see {@link getRoutesLength}
  */
  getRoutesLength() {
    return factory.Routes.getRoutesLength();
  }

  /**
  * @public
  * @method getRouteMethodsLength
  * @description Get the length of the methods in the route.
  * @param {string} url - path to the route
  * @returns {int} 0 or integer - returns 0 if there are no set routes,
  * or an integer number
  * @see {@link getRouteMethodsLength}
  */
  getRouteMethodsLength(url) {
    return factory.Routes.getRouteMethodsLength(url);
  }

  /**
  * @public
  * @method setSupportedHttpMethods
  * @description Set the supported http methods.
  * @param {array} methods - path to the route
  * @throws {error} error - if thrown by setSupportedHttpMethods
  * @returns {boolean} true - returns true on success
  * @see {@link setSupportedHttpMethods}
  */
  setSupportedHttpMethods(methods) {
    return factory.Routes.setSupportedHttpMethods(methods);
  }

  /**
  * @public
  * @method setMiddleware
  * @description Initialise middlewares.
  * @param {function} middleware - has to have 4 parameters
  * @throws {error} error - if thrown by setMiddleware
  * @returns {boolean} true
  * @see {@link setMiddleware}
  */
  setMiddleware(middleware) {
    return factory.Router.setMiddleware(middleware);
  }

  /**
  * @public
  * @method onRequest
  * @description Handle a request and route it to the required router.
  * @param {object} req - request
  * @param {object} res - response
  * @returns {object} middleware - returns the instantiated middleware
  * @see {@link onRequest}
  */
  onRequest(req, res) {
    return factory.Router.onRequest(req, res);
  }

  /**
  * @private
  * @method _factory
  * @description Initialise the two classes - Router and Routes
  * @see {@link Router}
  * @see {@link Routes}
  */
  _factory() {
    factory.Router = new Router();
    factory.Routes = new Routes();
  }

};
