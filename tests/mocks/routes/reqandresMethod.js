'use strict';
// let expect = require('chai').expect;
let fresh = require('fresh');

module.exports = {
  url: '/reqandres-method',
  getSingleRecord: function(req, res) {
    // expect(req.path).to.equal('/reqandres-method/foo');
    // console.log(res.status);
    // console.log('data');process.exit();
    // console.log('data');process.exit();
    return req.path;
    // return req.fresh;
  }
};
