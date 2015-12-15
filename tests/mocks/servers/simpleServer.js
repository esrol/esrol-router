'use strict';
var response = require('..\\..\\..\\lib\\router\\response');
var http = require('http');

http.createServer(function(req,res) {
  response.status(req).end('finito');
  // console.log(response.status(req));
  // res.__proto__ = response;
  // response.redirect("http://www.google.bg");
  // res.write("Hello World");
  // res.end(JSON.stringify({json: 'response'}));
}).listen(3000);


console.log('listening on port 3000');
// console.log(request);
// module.exports = {
  // request('http://www.google.com', function (error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     console.log(body) // Show the HTML for the Google homepage.
  //   }
  // })
// };