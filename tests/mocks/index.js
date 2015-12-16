'use strict';
let helloWorldRoute = require('./routes/helloWorld');
let fourOhFourRoute = require('./routes/fourOhFour');
let oneMethodRoute = require('./routes/oneMethod');
let reqMethodRoute = require('./routes/reqMethod');
let missingUrlPropertyRoute = require('./routes/missingUrlProperty');
let missingMethodsRoute = require('./routes/missingMethods');
let getQueryParamsRoute = require('./routes/getQueryParams');
let simpleMiddleware = require('./middlewares/simpleMiddleware');
let lessParamsMiddleware = require('./middlewares/lessParams');
let reqProperties = require('./requests/req-properties');
let simpleRequest = require('./requests/simpleRequest');
let simpleResponse = require('./responses/simpleResponse');
let response = require('./responses/response');

module.exports = {
  requests: {
    reqProperties: reqProperties,
    simpleRequest: simpleRequest,
  },
  responses: {
    simpleResponse: simpleResponse,
    response: response
  },
  middlewares: {
    simpleMiddleware: simpleMiddleware,
    lessParams: lessParamsMiddleware
  },
  routes: {
    helloWorld: helloWorldRoute,
    fourOhFour: fourOhFourRoute,
    missingUrlProperty: missingUrlPropertyRoute,
    oneMethod: oneMethodRoute,
    reqMethod: reqMethodRoute,
    getQueryParams: getQueryParamsRoute,
    missingMethods: missingMethodsRoute
  }
};
