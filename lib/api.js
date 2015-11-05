'use strict';
let Router = require ('./router');
let Routes = require ('./routes');

module.exports = class Api {

  constuctor() {
    this._factory();
  }

  registerRoute(route) {

  }

  setSupportedMethods(methods) {
    if (!Array.isArray(methods)) {
      let e = `"setSupportedMethods" expect array with http method names, but
        ${typeof method} given`;
      throw new Error(e);
    }
    this._supportedMethods = methods;
  }    

  _factory() {
    this._Router = new Router();
    this._Routes = new Routes();
    this._supportedMethods = [];
  }

};
