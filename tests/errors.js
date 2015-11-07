'use strict';
let expect = require('chai').expect;
let Err = require('../lib/router/errors.js');
let errors = new Err();


describe('Errors', () => {

  it('Should throw an error', () => {
    expect(() => { errors.error('Success', 1) }).to.throw(Error);    
  });

  it('Should throw an error with message "Success" and number "1"', () => {
    try {
      errors.error('Success', 1);
    } catch(e) {
      expect(e.code).to.equal(1);
      expect(e.message).to.equal('Success');
    }

  });

  it('Should throw an error with message "Success #2" and number "2"', () => {
    try {
      errors.error({
        name: 'FatalError',
        defaultMessage: 'Success #2',
        code: 2
      });
    } catch(e) {
      expect(e.code).to.equal(2);
      expect(e.message).to.equal('Success #2');
    }
  });  
  
});