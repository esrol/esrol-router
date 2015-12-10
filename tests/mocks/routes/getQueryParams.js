'use strict';
module.exports = {
  url: '/query-params',
  getMultipleRecords: function(req, res) {
    return req.query;
  }
};
