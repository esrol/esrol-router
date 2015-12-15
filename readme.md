[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

# esrol-router
This is the main class Api of the esrol-routers module. Here you can create new routes, set allowed ways of reaching them, handle responses, get information regarding those routes, and set middlewares.


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

## Classes
<dl>
<dt><a href="#Api">Api</a></dt>
<dd></dd>
</dl>
## Functions
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
<dd><p>Handle a request and route it to the required router.</p>
</dd>
</dl>
<a name="Api"></a>
## Api
**Kind**: global class  
**Access:** public  
**Author:** Ivaylo Ivanov  
<a name="new_Api_new"></a>
### new Api()
This is the main class Api of the esrol-routers module.
Here you can create new routes, set allowed ways of reaching them,
handle responses, get information regarding those routes, and
set middlewares.

<a name="registerRoute"></a>
## registerRoute(route) ⇒ <code>boolean</code>
Register a route.

**Kind**: global function  
**Returns**: <code>boolean</code> - true - returns true if registering was successful  
**Throws**:

- <code>error</code> - throws error if thrown by registerRoute in Routes

**Access:** public  
**See**: [registerRoute](registerRoute)  

| Param | Type | Description |
| --- | --- | --- |
| route | <code>object</code> | a route object, containing intormation for the route |

<a name="getRoutesLength"></a>
## getRoutesLength() ⇒ <code>int</code>
Get the ammount of registered routes.

**Kind**: global function  
**Returns**: <code>int</code> - - ammount of registered routes  
**Access:** public  
**See**: [getRoutesLength](#getRoutesLength)  
<a name="getRouteMethodsLength"></a>
## getRouteMethodsLength(url) ⇒ <code>int</code>
Get the length of the methods in the route.

**Kind**: global function  
**Returns**: <code>int</code> - 0 or integer - returns 0 if there are no set routes,
or an integer number  
**Access:** public  
**See**: [getRouteMethodsLength](#getRouteMethodsLength)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | path to the route |

<a name="setSupportedHttpMethods"></a>
## setSupportedHttpMethods(methods) ⇒ <code>boolean</code>
Set the supported http methods.

**Kind**: global function  
**Returns**: <code>boolean</code> - true - returns true on success  
**Throws**:

- <code>error</code> error - if thrown by setSupportedHttpMethods

**Access:** public  
**See**: [setSupportedHttpMethods](#setSupportedHttpMethods)  

| Param | Type | Description |
| --- | --- | --- |
| methods | <code>array</code> | allowed http methods |

<a name="setMiddleware"></a>
## setMiddleware(middleware) ⇒ <code>boolean</code>
Initialise middlewares.

**Kind**: global function  
**Returns**: <code>boolean</code> - true  
**Throws**:

- <code>error</code> error - if thrown by setMiddleware

**Access:** public  
**See**: [setMiddleware](#setMiddleware)  

| Param | Type | Description |
| --- | --- | --- |
| middleware | <code>function</code> | has to have 4 parameters |

<a name="onRequest"></a>
## onRequest(req, res) ⇒ <code>object</code>
Handle a request and route it to the required router.

**Kind**: global function  
**Returns**: <code>object</code> - middleware - returns the instantiated middleware  
**Access:** public  
**See**: [onRequest](#onRequest)  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>object</code> | request |
| res | <code>object</code> | response |

## License

[MIT](https://github.com/esrol/esrol-router/blob/master/LICENSE)


[npm-image]: https://badge.fury.io/js/esrol-router.svg
[npm-url]: https://npmjs.org/package/esrol-router
[travis-image]: https://travis-ci.org/ivaylopivanov/esrol-router.svg?branch=master
[travis-url]: https://travis-ci.org/ivaylopivanov/esrol-router
[daviddm-image]: https://david-dm.org/ivaylopivanov/esrol-router.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ivaylopivanov/esrol-router
[coveralls-image]: https://coveralls.io/repos/ivaylopivanov/esrol-router/badge.svg
[coveralls-url]: https://coveralls.io/r/ivaylopivanov/esrol-router