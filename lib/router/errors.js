'use strict';
let errors = require ('errors');

module.exports = class Errors {
  error(e, code) {
    if (typeof e === 'string') {
      let error = {};
      error.code = code;
      error.name = 'FatalError';
      error.defaultMessage = e;
      errors.create(error); 
      return this._throw();      
    }
    errors.create(e); 
    return this._throw();
  }
  _throw() {
    throw new errors.FatalError();      
  }
}