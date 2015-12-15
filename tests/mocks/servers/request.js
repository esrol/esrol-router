var request = require('request');
var request2 = require('..\\..\\..\\lib\\router\\request');

request('http://localhost:3000', function(error, result) {
  console.log(result);
  // console.log(error);
})

// request('http://localhost:3000', function(error, result) {
//   console.log(result);
//   // console.log(error);
// })