'use strict';

module.exports = {
  url: '/req-method',
  getSingleRecord: function(req, res) {
    return req.path;
  }
};
