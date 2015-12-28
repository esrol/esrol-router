[![NPM version][npm-image]][npm-url] 
[![Build Status][travis-image]][travis-url] 
[![Test coverage][coveralls-image]][coveralls-url]

# esrol-router
You can create new routes, set allowed ways of reaching them, handle responses, get information regarding those routes, and set middleware.


## Installation

```sh
$ npm install --save esrol-router
```

## Usage

```js
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
```
_Please see the <a href="https://github.com/esrol/esrol-server-app/wiki/Routes#router" target="_blank">docs</a> here, for information how to structure your route_

## Methods
<dl>
<dt><a href="#registerRoute">registerRoute(route)</a> ⇒ <code>boolean</code></dt>
<dd><p>Register a route.</p>
</dd>
<dt><a href="#getRoutesLength">getRoutesLength()</a> ⇒ <code>int</code></dt>
<dd><p>Get the ammount of registered routes.</p>
</dd>
<dt><a href="#getRouteMethodsLength">getRouteMethodsLength(url)</a> ⇒ <code>int</code></dt>
<dd><p>Get the length of the methods in the route.</p>
</dd>
<dt><a href="#setSupportedHttpMethods">setSupportedHttpMethods(methods)</a> ⇒ <code>boolean</code></dt>
<dd><p>Set the supported http methods.</p>
</dd>
<dt><a href="#setMiddleware">setMiddleware(middleware)</a> ⇒ <code>boolean</code></dt>
<dd><p>Initialise middlewares.</p>
</dd>
<dt><a href="#onRequest">onRequest(req, res)</a> ⇒ <code>object</code></dt>
<dd><p>Handle a request and route it to the required route.</p>
</dd>
</dl>

<a name="registerRoute"></a>
## registerRoute(route) ⇒ <code>boolean</code>
Register a route.

**Returns**: <code>boolean</code> - true - returns true if registering was successful  
**Throws**:

- <code>error</code> - throws error if thrown by registerRoute in Routes


| Param | Type | Description |
| --- | --- | --- |
| route | <code>object</code> | a route object, containing intormation for the route |

<a name="getRoutesLength"></a>
## getRoutesLength() ⇒ <code>int</code>
Get the ammount of registered routes.

**Returns**: <code>int</code> - - ammount of registered routes  
<a name="getRouteMethodsLength"></a>
## getRouteMethodsLength(url) ⇒ <code>int</code>
Get the methods number in the route.

**Returns**: <code>int</code> - 0 or integer - returns 0 if there are no set routes,
or an integer number  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | path to the route |

<a name="setSupportedHttpMethods"></a>
## setSupportedHttpMethods(methods) ⇒ <code>boolean</code>
Set the supported http methods.

**Returns**: <code>boolean</code> - true - returns true on success  
**Throws**:

- <code>error</code> error - if thrown by setSupportedHttpMethods

**See**: [setSupportedHttpMethods](#setSupportedHttpMethods)  

| Param | Type | Description |
| --- | --- | --- |
| methods | <code>array</code> | allowed http methods |

<a name="setMiddleware"></a>
## setMiddleware(middleware) ⇒ <code>boolean</code>
Initialise middlewares.

**Returns**: <code>boolean</code> - true  
**Throws**:

- <code>error</code> error - if thrown by setMiddleware


| Param | Type | Description |
| --- | --- | --- |
| middleware | <code>function</code> | has to have 4 parameters |

<a name="onRequest"></a>
## onRequest(req, res) ⇒ <code>object</code>
Handle a request and route it to the required router.

**Returns**: <code>mixed</code> - mixed - returns the value from the route // if returned  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>object</code> | request |
| res | <code>object</code> | response |

## Contriubtion

Any contribution will be highly appreciated. Just make sure that:

1. Your code works.  
2. You have 100% successful tests coverage.  
3. You have comments in your code.  
4. Follows eslint config. Exceptions are possible where that make sense.  

## Tests

  To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## License

[MIT](https://github.com/esrol/esrol-router/blob/master/LICENSE)

[npm-image]: https://badge.fury.io/js/esrol-router.svg
[npm-url]: https://npmjs.org/package/esrol-router
[travis-image]: https://travis-ci.org/esrol/esrol-router.svg?branch=master
[travis-url]: https://travis-ci.org/esrol/esrol-router
[coveralls-image]: https://coveralls.io/repos/esrol/esrol-router/badge.svg
[coveralls-url]: https://coveralls.io/r/esrol/esrol-router
