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

describe('Router', () => {

  describe('Registering a correct route', () => {

  });

  describe('On Request', () => {

  });
 
});