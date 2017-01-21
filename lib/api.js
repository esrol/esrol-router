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
const debug = require('debug')('esrol-router:api');
const Router = require('./router/router');
const Routes = require('./router/routes');
const router = new Router();
const routes = new Routes();

module.exports = class API {


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
    router.setRoutes(routes.registerRoute(route));
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
    return routes.getRoutesLength();
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
    return routes.getRouteMethodsLength(url);
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
    return routes.setSupportedHttpMethods(methods);
  }

  /**
  * @public
  * @method setNamespace
  * @description Set server namespace.
  * @param {string} namespace - eg 'v1' which will evaluate www.example.com/v1
  * @returns {boolean} true
  * @see {@link routes:setNamespace}
  */
  setNamespace(namespace) {
    return router.setNamespace(namespace);
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
    return router.setMiddleware(middleware);
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
    return router.onRequest(req, res);
  }

};
