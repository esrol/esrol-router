'use strict';
let expect = require('chai').expect;
let Router = require('../index.js');
let router = new Router();
let http = require('http');
let request = require('request');
let server = http.createServer((req, res) => {
  router.onRequest(req, res);
}).listen(3333);

describe('Request properties', () => {
  describe('On http request', () => {
    it('Should return "xhr" property value - false', (done) => {
      request('http://localhost:3333/req-properties', (error, result) => {
        expect(result.body).to.equal('false');
        done();
      });
    });
  });

  describe('On http get request to /req-properties/1', () => {
    it('Should return "path" property - /req-properties/1', (done) => {
      request('http://localhost:3333/req-properties/1', (error, result) => {
        expect(result.body).to.equal('/req-properties/1');
        done();
      });
    });
  });

  describe('On http get request to /missing-route', () => {
    it('Should return 404 from "fourOhFour" route', (done) => {
      request('http://localhost:3333/missing-route', (error, result) => {
        expect(result.statusCode).to.equal(404);
        expect(result.body).to.equal('fourOhFour');
        done();
      });
    });
  });

});
