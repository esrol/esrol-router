'use strict';
let expect = require('chai').expect;
let Router = require('../index.js');
let mocks = require('./mocks/index');
let router = new Router();

describe('Api Success...', function() {
  describe('setSupportedHttpMethods', () => {
    it('Should return true', () => {
      expect(router.setSupportedHttpMethods(['get', 'post', 'put', 'delete']))
      .to.equal(true);
    });
  });

  describe('registerRoute', function() {
    it('should return true when new route has been registered', function() {
      let route = mocks.routes.helloWorld;
      expect(router.registerRoute(route)).to.equal(true);
    });
  });

  describe('getRoutesLength', function() {
    it('should return number of routes (1 so far)', function() {
      expect(router.getRoutesLength()).to.equal(1);
    });
  });

  describe('registerRoute', function() {
    it('should return true when new route has been registered', function() {
      let route = mocks.routes.getQueryParams;
      expect(router.registerRoute(route)).to.equal(true);
    });
  });

  describe('getRoutesLength', function() {
    it('should return number of routes (2 so far)', function() {
      expect(router.getRoutesLength()).to.equal(2);
    });
  });

  describe('getRouteMethodsLength', function() {
    it('should return ammount of existing methods in route (in this case - 2)',
    function() {
      let url = mocks.routes.helloWorld.url;
      expect(router.getRouteMethodsLength(url)).to.equal(2);
    });
  });

  describe('getRouteMethodsLength', function() {
    it('Route "" should have 0 methods', () => {
      expect(router.getRouteMethodsLength('')).to.equal(0);
    });
  });

  describe('Using default middleware', function() {
    describe('onRequest for multiple records "/hello-world/"', function() {
      it('Should return "hello-world"', function() {
        let req = mocks.requests.simpleRequest;
        let res = mocks.responses.simpleResponse;
        req.url = '/hello-world/';
        expect(router.onRequest(req, res)).to.equal('hello-world');
      });
    });

    describe('onRequest for signle record like "/hello-world/foo"', function() {
      it('Should return "foo"', function() {
        let req = mocks.requests.simpleRequest;
        let res = mocks.responses.simpleResponse;
        req.url = '/hello-world/foo';
        expect(router.onRequest(req, res)).to.equal('foo');
      });
    });
  });

  describe('Set and use new middleware', function() {
    describe('setMiddleware', () => {
      it('Should return true', () => {
        let middleware = mocks.middlewares.simpleMiddleware;
        expect(router.setMiddleware(middleware)).to.equal(true);
      });
    });

  describe('registerRoute', function() {
    it('should return true when new route has been registered', function() {
      let route = mocks.routes.reqandresMethod;
      expect(router.registerRoute(route)).to.equal(true);
    });
  });
  describe('onRequest for signle record like "/reqandres-method/foo"', function() {
    it('Should return "foo"', function() {
      let req = mocks.requests.simpleRequest;
      let res = mocks.responses.simpleResponse;
      req.url = '/reqandres-method/foo';
      expect(router.onRequest(req, res)).to.equal('/reqandres-method/foo');
    });
  });
           
    describe('onRequest for multiple records "/hello-world/"', function() {
      it('Should return "hello-world"', function() {
        let req = mocks.requests.simpleRequest;
        let res = mocks.responses.simpleResponse;
        req.url = '/hello-world/';
        expect(router.onRequest(req, res)).to.equal('hello-world');
      });
    });

    describe('onRequest for signle record like "/hello-world/foo"', function() {
      it('Should return "foo"', function() {
        let req = mocks.requests.simpleRequest;
        let res = mocks.responses.simpleResponse;
        req.url = '/hello-world/foo';
        expect(router.onRequest(req, res)).to.equal('foo');
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
    describe('registerRoute', function() {
      it('should return true when new route has been registered', function() {
        let route = mocks.routes.fourOhFour;
        expect(router.registerRoute(route)).to.equal(true);
      });
    });
    describe('onRequest for signle record that doesn\'t exist like "/bar/foo"', function() {
      it('Should return "404"', function() {
        let req = mocks.requests.simpleRequest;
        let res = mocks.responses.simpleResponse;
        req.url = '/bar/foo';
        expect(router.onRequest(req, res)).to.equal(404);
      });
    });
    // it('', (done) => {
    //   var request = require('request');
    //   request('http://www.google.com', function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //       done();
    //       console.log(body) // Show the HTML for the Google homepage.
    //     }
    //   })
    // });
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

describe('Api Fail...', function() {
  let should = 'Should throw an error';

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