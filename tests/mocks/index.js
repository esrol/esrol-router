'use strict';
let helloWorldRoute = require('./routes/helloWorld');
let oneMethodRoute = require('./routes/oneMethod');
let missingUrlPropertyRoute = require('./routes/missingUrlProperty');
let missingMethodsRoute = require('./routes/missingMethods');
let getQueryParamsRoute = require('./routes/getQueryParams');
let simpleMiddleware = require('./middlewares/simpleMiddleware');
let lessParamsMiddleware = require('./middlewares/lessParams');
let simpleRequest = require('./requests/simpleRequest');
let simpleResponse = require('./responses/simpleResponse');

module.exports = {
  requests: {
    simpleRequest: simpleRequest
  },
  responses: {
    simpleResponse: simpleResponse
  },
  middlewares: {
    simpleMiddleware: simpleMiddleware,
    lessParams: lessParamsMiddleware
  },
  routes: {
    helloWorld: helloWorldRoute,
    missingUrlProperty: missingUrlPropertyRoute,
    oneMethod: oneMethodRoute,
    getQueryParams: getQueryParamsRoute,
    missingMethods: missingMethodsRoute
  }
};
