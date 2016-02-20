'use strict';
let expect = require('chai').expect;
let Router = require('../index.js');
let mocks = require('./mocks/index');
let router = new Router();

describe('Api Success...', () => {

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

  describe('On getRoutesLength', () => {
    it('should return number of routes (1 so far)', () => {
      expect(router.getRoutesLength()).to.equal(1);
    });
  });

  describe('On registerRoute', () => {
    it('should return true when new route has been registered', () => {
      expect(router.registerRoute(mocks.routes.getQueryParams)).to.equal(true);
      expect(router.registerRoute(mocks.requests.reqProperties)).to.equal(true);
      expect(router.registerRoute(mocks.responses.response)).to.equal(true);
    });
  });

  describe('On getRoutesLength', () => {
    it('should return number of routes (4 so far)', () => {
      expect(router.getRoutesLength()).to.equal(4);
    });
  });

  describe('getRouteMethodsLength', () => {
    it('should return ammount of existing methods in route (in this case - 2)',
    () => {
      let url = mocks.routes.helloWorld.url;
      expect(router.getRouteMethodsLength(url)).to.equal(2);
    });
  });

  describe('getRouteMethodsLength', () => {
    it('Route "" should have 0 methods', () => {
      expect(router.getRouteMethodsLength('')).to.equal(0);
    });
  });

  describe('Using default middleware', () => {
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

  describe('Set and use new middleware', () => {
    describe('setMiddleware', () => {
      it('Should return true', () => {
        let middleware = mocks.middlewares.simpleMiddleware;
        expect(router.setMiddleware(middleware)).to.equal(true);
      });
    });
  });

  describe('On registerRoute', () => {
    it('should return true when new route has been registered', () => {
      let route = mocks.routes.reqMethod;
      expect(router.registerRoute(route)).to.equal(true);
    });
  });

  describe('"onRequest" for signle record like "/req-method/foo"', () => {
    it('Should return the path property - "/req-method/foo"', () => {
      let req = mocks.requests.simpleRequest;
      let res = mocks.responses.simpleResponse;
      req.url = '/req-method/foo';
      expect(router.onRequest(req, res)).to.equal('/req-method/foo');
    });
  });

  describe('"onRequest" for multiple records "/hello-world/"', () => {
    it('Should return "hello-world"', () => {
      let req = mocks.requests.simpleRequest;
      let res = mocks.responses.simpleResponse;
      req.url = '/hello-world/';
      expect(router.onRequest(req, res)).to.equal('hello-world');
    });
  });

  describe('"onRequest" for signle record like "/hello-world/foo"', () => {
    it('Should return "foo"', () => {
      let req = mocks.requests.simpleRequest;
      let res = mocks.responses.simpleResponse;
      req.url = '/hello-world/foo';
      expect(router.onRequest(req, res)).to.equal('foo');
    });
  });

  describe('"onRequest" for multiple records "/foo" - not existing', () => {
    it('Should return statusCode "404"', () => {
      let req = mocks.requests.simpleRequest;
      let res = mocks.responses.simpleResponse;
      req.url = '/foo';
      expect(router.onRequest(req, res)).to.equal(404);
    });
  });

  describe('"onRequest" for signle record "/foo/bar" - not existing', () => {
    it('Should return statusCode "404"', () => {
      let req = mocks.requests.simpleRequest;
      let res = mocks.responses.simpleResponse;
      req.url = '/foo/bar';
      expect(router.onRequest(req, res)).to.equal(404);
    });
  });

  describe('On "registerRoute"', () => {
    it('should return true when new route has been registered', () => {
      let route = mocks.routes.fourOhFour;
      expect(router.registerRoute(route)).to.equal(true);
    });
  });

  describe('Testing query params object', () => {

    let des = '"onRequest" for multiple records "/query-params?name=foo%20name&ages=bar';
    describe(des, () => {
      it('Should return object "{name: "foo name", ages: "bar"}"', () => {
        let req = mocks.requests.simpleRequest;
        let res = mocks.responses.simpleResponse;
        req.url = '/query-params?name=foo%20name&ages=bar';
        let result = router.onRequest(req, res);
        console.log (result)
        expect(result).to.be.an('object');
        expect(result.name).to.equal('foo name');
        expect(result.ages).to.equal('bar');
      });
    });

    describe('"onRequest" for multiple records "/query-params?"', () => {
      it('Should return object "{}"', () => {
        let req = mocks.requests.simpleRequest;
        let res = mocks.responses.simpleResponse;
        req.url = '/query-params?';
        expect(router.onRequest(req, res)).to.be.an('object');
      });
    });

    describe('"onRequest" for multiple records "/query-params"', () => {
      it('Should return object "{}"', () => {
        let req = mocks.requests.simpleRequest;
        let res = mocks.responses.simpleResponse;
        req.url = '/query-params';
        expect(router.onRequest(req, res)).to.be.an('object');
      });
    });

    des = '"onRequest" for multiple records "/query-params?name=foo&ages=bar';
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

    describe('"onRequest" for multiple records "/query-params?"', () => {
      it('Should return object "{}"', () => {
        let req = mocks.requests.simpleRequest;
        let res = mocks.responses.simpleResponse;
        req.url = '/query-params?';
        expect(router.onRequest(req, res)).to.be.an('object');
      });
    });

    describe('"onRequest" for multiple records "/query-params"', () => {
      it('Should return object "{}"', () => {
        let req = mocks.requests.simpleRequest;
        let res = mocks.responses.simpleResponse;
        req.url = '/query-params';
        expect(router.onRequest(req, res)).to.be.an('object');
      });
    });

  });

});


describe('Api Fail...', () => {

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
