'use strict';
let expect = require('chai').expect;
let Router = require('../index.js');
let route = require('./mocks/requests/req-properties');
let router = new Router();
let http = require('http');
let request = require('request');
let server = http.createServer((req, res) => {
  router.onRequest(req, res);
}).listen(3334);

describe('Response properties', () => {

  describe('On http get request to "/response"', () => {
    it('Should return status "401"', (done) => {
      request('http://localhost:3334/response', (error, result) => {
        expect(result.statusCode).to.equal(401);
        done();
      });
    });
  });

  describe('On http get request to "/response/json" - testing json', () => {
    it('Should return json object: "{"record": "json"}"', (done) => {
      request('http://localhost:3334/response/json', (error, result) => {
        let json = JSON.parse(result.body);
        expect(json.record).to.equal('json');
        done();
      });
    });
  });

  describe('On http post request to "/response" - testing redirect', () => {
    it('Should set status code "302"', (done) => {
      request.post('http://localhost:3334/response', (error, result) => {
        expect(result.statusCode).to.equal(302);
        done();
      });
    });
  });

  describe('On http post request to "/response/json" - json branch', () => {
    it('Should return json object: "{"record": "json"}"', (done) => {
      request.post('http://localhost:3334/response/json', (error, result) => {
        let json = JSON.parse(result.body);
        expect(json.record).to.equal('json');
        done();
      });
    });
  });

  describe('On http get request to "/response/json/" - router branch', () => {
    it('Should return json object: "{"record": "json"}"', (done) => {
      request('http://localhost:3334/response/json/', (error, result) => {
        let json = JSON.parse(result.body);
        expect(json.record).to.equal('json');
        done();
      });
    });
  });

});
