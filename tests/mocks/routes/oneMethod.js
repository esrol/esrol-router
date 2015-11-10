'use strict';
module.exports = {
  url: '/one-method',
  getSingleRecord: function(req, res) {
    return this.url;
  }
};
