'use strict';
let expect = require('chai').expect;

module.exports = class ReqProperties {

  static get url() {
    return '/req-properties';
  }

  static getMultipleRecords(req, res) {
    res.end(req.xhr.toString());
  }

  static getSingleRecord(req, res) {
    res.end(req.path);
  }

};
