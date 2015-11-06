'use strict';
let Router = require ('./router/router');
let Routes = require ('./router/routes');
let factory = new WeakMap();

module.exports = class Api {

  constructor() {
    this._factory();
  }

  registerRoute(route) {
    return factory.Routes.registerRoute(route);
  }

  getRoutesLength() {
    return factory.Routes.getRoutesLength();
  }

  getRouteMethodsLength(url) {
    return factory.Routes.getRouteMethodsLength(url);
  } 

  setSupportedHttpMethods(methods) {
    return factory.Routes.setSupportedHttpMethods(methods);
  } 

  setMiddleware(middleware) {
    return factory.Router.setMiddleware(middleware);
  } 

  onRequest(req, res) {
    return factory.Router.onRequest(req, res);
  }   

  _factory() {
    factory.Router = new Router();
    factory.Routes = new Routes();
  }

};
