/**
 * @author Ivaylo Ivanov
 * @public
 * @class API
 * @description This is the main class API of the esrol-routers module.
 * @requires debug
 * @requires router
 * @requires routes
 */
'use strict';
let debug = require('debug')('esrol-router:api');
let Router = require('./router/router');
let Routes = require('./router/routes');
let api = new WeakMap();

module.exports = class API {

  /**
  * @private
  * @method constructor
  * @description Initialise the two classes - Router and Routes
  */
  constructor() {
    api.Router = new Router();
    api.Routes = new Routes();
  }

  /**
  * @public
  * @method registerRoute
  * @description Register a route.
  * @param {object} route - a route object, containing intormation for the route
  * @throws {error} - throws error if thrown by registerRoute in Routes
  * @returns {boolean} true - returns true if registering was successful
  * @see {@link routes:registerRoute}
  */
  registerRoute(route) {
    debug('Registering route.');
    let routes = api.Routes.registerRoute(route);
    api.Router.setRoutes(routes);
    return true;
  }

  /**
  * @public
  * @method getRoutesLength
  * @description Get the ammount of registered routes.
  * @returns {int} - ammount of registered routes
  * @see {@link routes:getRoutesLength}
  */
  getRoutesLength() {
    return api.Routes.getRoutesLength();
  }

  /**
  * @public
  * @method getRouteMethodsLength
  * @description Get the number of the methods in the route.
  * @param {string} url - path to the route
  * @returns {int} -  returns 0 if there are no set routes
  * @see {@link routes:getRouteMethodsLength}
  */
  getRouteMethodsLength(url) {
    return api.Routes.getRouteMethodsLength(url);
  }

  /**
  * @public
  * @method setSupportedHttpMethods
  * @description Set the supported http methods.
  * @param {array} methods - eg ['GET', 'POST', 'PUT', 'DELETE']
  * @throws {error} error - if thrown by setSupportedHttpMethods
  * @returns {boolean} true - returns true on success
  * @see {@link routes:setSupportedHttpMethods}
  */
  setSupportedHttpMethods(methods) {
    return api.Routes.setSupportedHttpMethods(methods);
  }

  /**
  * @public
  * @method setMiddleware
  * @description Set middleware.
  * @param {function} middleware - has to have 4 parameters
  * @throws {error} error - if thrown by setMiddleware
  * @returns {boolean} true
  * @see {@link router:setMiddleware}
  */
  setMiddleware(middleware) {
    return api.Router.setMiddleware(middleware);
  }

  /**
  * @public
  * @method onRequest
  * @description Handle a request and route it to the required route.
  * @param {object} req - request
  * @param {object} res - response
  * @returns {object} middleware - returns the instantiated middleware
  * @see {@link router:onRequest}
  */
  onRequest(req, res) {
    return api.Router.onRequest(req, res);
  }

};
