'use strict';
module.exports = function(req, res, route, scope) {
  return route.call(scope, req, res);
};
