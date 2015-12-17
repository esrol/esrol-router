[![NPM version][npm-image]][npm-url] 
[![Build Status][travis-image]][travis-url] 
[![Test coverage][coveralls-image]][coveralls-url]

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
<a name="new_Api_new"></a>
### new Api()
This is the main class Api of the esrol-routers module.
Here you can create new routes, set allowed ways of reaching them,
handle responses, get information regarding those routes, and
set middlewares.

<a name="registerRoute"></a>
## registerRoute(route) ⇒ <code>boolean</code>
Register a route.

**Returns**: <code>boolean</code> - true - returns true if registering was successful  
**Throws**:

- <code>error</code> - throws error if thrown by registerRoute in Routes

**See**: [registerRoute](registerRoute)  

| Param | Type | Description |
| --- | --- | --- |
| route | <code>object</code> | a route object, containing intormation for the route |

<a name="getRoutesLength"></a>
## getRoutesLength() ⇒ <code>int</code>
Get the ammount of registered routes.

**Returns**: <code>int</code> - - ammount of registered routes  
**See**: [getRoutesLength](#getRoutesLength)  
<a name="getRouteMethodsLength"></a>
## getRouteMethodsLength(url) ⇒ <code>int</code>
Get the length of the methods in the route.

**Returns**: <code>int</code> - 0 or integer - returns 0 if there are no set routes,
or an integer number  
**See**: [getRouteMethodsLength](#getRouteMethodsLength)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | path to the route |

<a name="setSupportedHttpMethods"></a>
## setSupportedHttpMethods(methods) ⇒ <code>boolean</code>
Set the supported http methods.

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

**Returns**: <code>boolean</code> - true  
**Throws**:

- <code>error</code> error - if thrown by setMiddleware

**See**: [setMiddleware](#setMiddleware)  

| Param | Type | Description |
| --- | --- | --- |
| middleware | <code>function</code> | has to have 4 parameters |

<a name="onRequest"></a>
## onRequest(req, res) ⇒ <code>object</code>
Handle a request and route it to the required router.

**Returns**: <code>object</code> - middleware - returns the instantiated middleware  
**See**: [onRequest](#onRequest)  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>object</code> | request |
| res | <code>object</code> | response |


## Modules
<dl>
<dt><a href="#module_Response">Response</a></dt>
<dt><a href="#module_Request">Request</a></dt>
<dd></dd>
</dl>
<a name="module_Response"></a>
## Response
The response object represents the HTTP response that an Express app
sends when it gets an HTTP request.
Using express response for reference

**See**: [https://github.com/strongloop/express/blob/master/lib/response.js](https://github.com/strongloop/express/blob/master/lib/response.js)  

* [Response](#module_Response)
  * [~status(code)](#module_Response..status) ⇒ <code>ServerResponse</code>
  * [~json(obj)](#module_Response..json)
  * [~redirect()](#module_Response..redirect)

<a name="module_Response..res"></a>
### Response~res
Response prototype.

<a name="module_Response..status"></a>
### Response~status(code) ⇒ <code>ServerResponse</code>
Set status `code`.

| Param | Type |
| --- | --- |
| code | <code>Number</code> | 

<a name="module_Response..json"></a>
### Response~json(obj)
Send JSON response.

Examples:

    res.json(null);
    res.json({ foo: 'bar' });

| Param | Type |
| --- | --- |
| obj | <code>string</code> &#124; <code>number</code> &#124; <code>boolean</code> &#124; <code>object</code> | 

<a name="module_Response..redirect"></a>
### Response~redirect(url)
Redirect to the given `url` with status 302

Examples:

    res.redirect('/foo/bar');
    res.redirect('http://example.com');

| Param | Type |
| --- | --- |
| url | <code>string</code> |

<a name="module_Request"></a>
## Request
The request object represents the HTTP request
Using express request for reference

**See**: [https://github.com/strongloop/express/blob/master/lib/request.js](https://github.com/strongloop/express/blob/master/lib/request.js)  
<a name="module_Request..req"></a>
### Request~req
Request prototype.

* [Request](#module_Request)
  * [path](#module_Request..path) => <code>string</code> requested path
  * [xhr](#module_Request..xhr) => <code>boolean</code> Check if the request was an _XMLHttpRequest_

## License

[MIT](https://github.com/esrol/esrol-router/blob/master/LICENSE)


[npm-image]: https://badge.fury.io/js/esrol-router.svg
[npm-url]: https://npmjs.org/package/esrol-router
[travis-image]: https://travis-ci.org/esrol/esrol-router.svg?branch=master
[travis-url]: https://travis-ci.org/esrol/esrol-router
[coveralls-image]: https://coveralls.io/repos/esrol/esrol-router/badge.svg
[coveralls-url]: https://coveralls.io/r/esrol/esrol-router