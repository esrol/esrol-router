'use strict';

module.exports = {
  url: '/fourOhFour',
  getMultipleRecords: function(req, res) {
    return 404;
  },
  getSingleRecord: function(req, res) {
    return req.record;
  }
};
