'use strict';
let Router = require('esrol-router');
let http = require('http');
let router = new Router();
let route = {
  url: '/posts',
  getMultipleRecords: function(req, res) {
    return res.end('posts');
  },
  getSingleRecord: function(req, res) {
    return res.end(req.record);
  }
};
router.setSupportedHttpMethods(['GET']);
router.registerRoute(route);

http.createServer((req, res) => {
  router.onRequest(req, res);
}).listen(3333);

//curl localhost:3333/posts
//curl localhost:3333/posts/1