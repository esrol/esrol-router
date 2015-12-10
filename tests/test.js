'use strict';
let expect = require('chai').expect;
let Router = require('../index.js');
let mocks = require('./mocks/index');
let router = new Router();

describe('Api Success...', () => {

  describe('setSupportedHttpMethods', () => {
    it('Should return true', () => {
      expect(router.setSupportedHttpMethods(['get', 'post', 'put', 'delete']))
      .to.equal(true);
    });
  });

  describe('registerRoute', () => {
    it('Should return true on registered route', () => {
      let route = mocks.routes.helloWorld;
      expect(router.registerRoute(route)).to.equal(true);
      route = mocks.routes.oneMethod;
      expect(router.registerRoute(route)).to.equal(true);
      route = mocks.routes.getQueryParams;
      expect(router.registerRoute(route)).to.equal(true);
    });
    it('Routes current length should be three', () => {
      expect(router.getRoutesLength()).to.equal(3);
    });
    it('Route "/hello-world" should have two methods', () => {
      expect(router.getRouteMethodsLength('/hello-world')).to.equal(2);
    });
    it('Route "" should have 0 methods', () => {
      expect(router.getRouteMethodsLength('')).to.equal(0);
    });
  });

  describe('Using default middleware', () => {
    describe('onRequest for multiple records "/hello-world"', () => {
      it('Should return "hello-world"', () => {
        let req = mocks.requests.simpleRequest;
        let res = mocks.responses.simpleResponse;
        req.url = '/hello-world';
        expect(router.onRequest(req, res)).to.equal('hello-world');
      });
    });

    describe('onRequest for multiple records "/hello-world/"', () => {
      it('Should return "hello-world"', () => {
        let req = mocks.requests.simpleRequest;
        let res = mocks.responses.simpleResponse;
        req.url = '/hello-world/';
        expect(router.onRequest(req, res)).to.equal('hello-world');
      });
    });

    describe('onRequest for signle record like "/hello-world/foo"', () => {
      it('Should return "foo"', () => {
        let req = mocks.requests.simpleRequest;
        let res = mocks.responses.simpleResponse;
        req.url = '/hello-world/foo';
        expect(router.onRequest(req, res)).to.equal('foo');
      });
    });
  });

  describe('setMiddleware', () => {
    it('Should return true', () => {
      let middleware = mocks.middlewares.simpleMiddleware;
      expect(router.setMiddleware(middleware)).to.equal(true);
    });
  });

  describe('registerRoute', () => {
    it('Should return true on registered route', () => {
      let route = mocks.routes.helloWorld;
      expect(router.registerRoute(route)).to.equal(true);
      route = mocks.routes.oneMethod;
      expect(router.registerRoute(route)).to.equal(true);
      route = mocks.routes.getQueryParams;
      expect(router.registerRoute(route)).to.equal(true);
    });
    it('Routes current length should be three', () => {
      expect(router.getRoutesLength()).to.equal(3);
    });
    it('Route "/hello-world" should have two methods', () => {
      expect(router.getRouteMethodsLength('/hello-world')).to.equal(2);
    });
  });

  describe('onRequest for multiple records "/hello-world"', () => {
    it('Should return "hello-world"', () => {
      let req = mocks.requests.simpleRequest;
      let res = mocks.responses.simpleResponse;
      req.url = '/hello-world';
      expect(router.onRequest(req, res)).to.equal('hello-world');
    });
  });

  describe('onRequest for multiple records "/hello-world/"', () => {
    it('Should return "hello-world"', () => {
      let req = mocks.requests.simpleRequest;
      let res = mocks.responses.simpleResponse;
      req.url = '/hello-world/';
      expect(router.onRequest(req, res)).to.equal('hello-world');
    });
  });

  describe('onRequest for signle record like "/hello-world/foo"', () => {
    it('Should return "foo"', () => {
      let req = mocks.requests.simpleRequest;
      let res = mocks.responses.simpleResponse;
      req.url = '/hello-world/foo';
      expect(router.onRequest(req, res)).to.equal('foo');
    });
  });

  describe('onRequest for signle record like "/hello-world/foo/"', () => {
    it('Should return "foo"', () => {
      let req = mocks.requests.simpleRequest;
      let res = mocks.responses.simpleResponse;
      req.url = '/hello-world/foo/';
      expect(router.onRequest(req, res)).to.equal('foo');
    });
  });

  describe('onRequest for signle record like "/one-method/foo"', () => {
    it('Should return "/one-method"', () => {
      let req = mocks.requests.simpleRequest;
      let res = mocks.responses.simpleResponse;
      req.url = '/one-method/foo';
      expect(router.onRequest(req, res)).to.equal('/one-method');
    });
  });

  describe('onRequest for multiple records like "/one-method"', () => {
    it('Should return statusCode 404', () => {
      let req = mocks.requests.simpleRequest;
      let res = mocks.responses.simpleResponse;
      req.url = '/one-method';
      expect(router.onRequest(req, res)).to.equal(404);
    });
  });

  describe('onRequest for multiple records "/foo"', () => {
    it('Should return statusCode 404', () => {
      let req = mocks.requests.simpleRequest;
      let res = mocks.responses.simpleResponse;
      req.url = '/foo';
      expect(router.onRequest(req, res)).to.equal(404);
    });
  });

  describe('onRequest for signle record "/foo/bar', () => {
    it('Should return statusCode 404', () => {
      let req = mocks.requests.simpleRequest;
      let res = mocks.responses.simpleResponse;
      req.url = '/foo/bar';
      expect(router.onRequest(req, res)).to.equal(404);
    });
  });

  let des = 'onRequest for multiple records "/query-params?name=foo&ages=bar';
  describe(des, () => {
    it('Should return object "{name: "foo", ages: "bar"}"', () => {
      let req = mocks.requests.simpleRequest;
      let res = mocks.responses.simpleResponse;
      req.url = '/query-params?name=foo&ages=bar';
      let result = router.onRequest(req, res);
      expect(result).to.be.an('object');
      expect(result.name).to.equal('foo');
      expect(result.ages).to.equal('bar');
    });
  });

  describe('onRequest for multiple records "/query-params?"', () => {
    it('Should return object "{}"', () => {
      let req = mocks.requests.simpleRequest;
      let res = mocks.responses.simpleResponse;
      req.url = '/query-params?';
      expect(router.onRequest(req, res)).to.be.an('object');
    });
  });

  describe('onRequest for multiple records "/query-params"', () => {
    it('Should return object "{}"', () => {
      let req = mocks.requests.simpleRequest;
      let res = mocks.responses.simpleResponse;
      req.url = '/query-params';
      expect(router.onRequest(req, res)).to.be.an('object');
    });
  });

});

describe('Api Fail...', () => {

  let should = 'Should throw an error';

  describe('setSupportedHttpMethods with non array param', () => {
    it(should, () => {
      expect(() => router.setSupportedHttpMethods('GET')).to.throw(Error);
    });
  });

  describe('setSupportedHttpMethods with empty array param', () => {
    it(should, () => {
      expect(() => router.setSupportedHttpMethods([])).to.throw(Error);
    });
  });

  describe('registerRoute with missing "url" property', () => {
    it(should, () => {
      let route = mocks.routes.missingUrlProperty;
      expect(() => router.registerRoute(route)).to.throw(Error);
    });
  });

  describe('registerRoute with missing "route" object', () => {
    it(should, () => {
      let route = mocks.routes.missingUrlProperty;
      expect(() => router.registerRoute()).to.throw(Error);
    });
  });

  describe('registerRoute with missing methods', () => {
    it(should, () => {
      let route = mocks.routes.missingMethods;
      expect(() => router.registerRoute(route)).to.throw(Error);
    });
  });

  describe('registerRoute with non object as param', () => {
    it(should, () => {
      let route = 'really';
      expect(() => router.registerRoute(route)).to.throw(Error);
    });
  });

  describe('setMiddleware with non function as param', () => {
    it(should, () => {
      let middleware = 'really';
      expect(() => router.setMiddleware(middleware)).to.throw(Error);
    });
  });

  describe('setMiddleware with function which accept 3 params, not 4', () => {
    it(should, () => {
      let middleware = mocks.middlewares.lessParams;
      expect(() => router.setMiddleware(middleware)).to.throw(Error);
    });
  });

});