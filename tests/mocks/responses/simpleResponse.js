'use strict';
module.exports = {
  statusCode: undefined,
  end: function() {
    let statusCode = this.statusCode;
    this.statusCode = undefined;
    return statusCode;
  }
};
