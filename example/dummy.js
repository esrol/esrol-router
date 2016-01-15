'use strict';
const Router = require('esrol-router');
const http = require('http');
const router = new Router();
const route = {
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