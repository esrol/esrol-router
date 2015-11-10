'use strict';
module.exports = {
  url: '/hello-world',
  getMultipleRecords: function(req, res) {
    return 'hello-world';
  },
  getSingleRecord: function(req, res) {
    return req.record;
  }    
}
