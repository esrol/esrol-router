'use strict';
let errors = require ('errors');

module.exports = class Errors {
  error(e, number) {
    let error = {};
    error.number = number;
    if (typeof e === 'string') {
      error.name = 'FatalSecurityError';
      error.defaultMessage = e;
      return this._throw();      
    }
    errors.create(e); 
    return this._throw();
  }
  _throw() {
    throw new errors.FatalSecurityError();      
  }
}