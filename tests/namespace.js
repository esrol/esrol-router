'use strict';
let expect = require('chai').expect;
let Router = require('../index.js');
let mocks = require('./mocks/index');
let router = new Router();

describe('Namespaces v1...', () => {

  describe('On setting a namespace', () => {
    it('Should not throw an error', () => {
      expect(router.setNamespace('/v1')).to.be.a.true;
    });
  });

  describe('On "setSupportedHttpMethods"', () => {
    it('Should return "true"', () => {
      expect(router.setSupportedHttpMethods(['get', 'post', 'put', 'delete']))
      .to.equal(true);
    });
  });

  describe('On registerRoute', () => {
    it('should return true when new route has been registered', () => {
      let route = mocks.routes.helloWorld;
      expect(router.registerRoute(route)).to.equal(true);
    });
  });

  describe('"onRequest" for signle record like "/hello-world"', () => {
    it('Should return the path property - "/hello-world"', () => {
      let req = mocks.requests.simpleRequest;
      let res = mocks.responses.simpleResponse;
      req.url = '/hello-world';
      expect(router.onRequest(req, res)).to.equal('hello-world');
    });
  });

});
