'use strict';
let helloWorldRoute = require('./routes/helloWorld');
let fourOhFourRoute = require('./routes/fourOhFour');
let oneMethodRoute = require('./routes/oneMethod');
let reqandresMethodRoute = require('./routes/reqandresMethod');
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
    fourOhFour: fourOhFourRoute,
    missingUrlProperty: missingUrlPropertyRoute,
    oneMethod: oneMethodRoute,
    reqandresMethod: reqandresMethodRoute,
    getQueryParams: getQueryParamsRoute,
    missingMethods: missingMethodsRoute
  },
  servers: {
    // simpleServer: simpleServer
  }
};
