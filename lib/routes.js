'use strict';
module.exports = class Routes {
  
  constructor() {
    this._initializeProperties();
  }

  _initializeProperties() {
    this._routes = [];    
    this._supportedMethods = [];        
  }

  registerRoute(route) {
    if (!route || !route.url) {
      throw new Error('"registerRoute" expect route object with url property');
    }
  }
};
