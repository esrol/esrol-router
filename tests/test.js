'use strict';
let expect = require('chai').expect;
let Router = require('../index.js');
let router = new Router();

var route = {
  url: '/hello-world',
  getMultipleRecords: function(req, res) {
    return 'hello-world';
  },
  getSingleRecord: function(req, res) {
    return req.record;
  }
}

describe('Api Success', () => {

  describe('Register http methods', () => {
    it('Should return true on methods set', () => {
      expect(router.setSupportedHttpMethods(['get', 'post', 'put', 'delete']))
      .to.equal(true)
    });
  });

  describe('Registering a correct route', () => {
    it('Should return true on registered route', () => {
      expect(router.registerRoute(route)).to.equal(true);      
    });
    it('Routes current length should be one', () => {
      expect(router.getRoutesLength()).to.equal(1);
    });
    it('Route "/hello-world" should have two methods', () => {
      expect(router.getRouteMethodsLength('/hello-world')).to.equal(2);
    });    
  });

  describe('On Request', () => {

  });
 
});