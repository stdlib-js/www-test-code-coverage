/**
* @license Apache-2.0
*
* Copyright (c) 2025 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var resolve = require( 'path' ).resolve;
var fastify = require( 'fastify' );
var helmet = require( '@fastify/helmet' );
var cookie = require( '@fastify/cookie' );
var fastifyStatic = require( '@fastify/static' );
var isFunction = require( '@stdlib/assert/is-function' );
var isString = require( '@stdlib/assert/is-string' );
var cwd = require( '@stdlib/process/cwd' );
var copy = require( '@stdlib/utils/copy' );
var format = require( '@stdlib/string/format' );
var routes = require( './routes' );
var DEFAULTS = require( './defaults.json' );
var validate = require( './validate.js' );


// MAIN //

/**
* Returns a function which creates an HTTP server for serving test code coverage.
*
* @param {Options} [options] - server options
* @param {string} [options.address="127.0.0.1"] - server address
* @param {string} [options.hostname] - server hostname
* @param {(boolean|string)} [options.logger=false] - either a boolean indicating whether to enable logging or a log level
* @param {NonNegativeInteger} [options.port=0] - server port
* @param {(string|StringArray)} [options.prefix="/"] - URL path prefix(es) used to create a virtual mount path(s) for static directories
* @param {string} [options.root] - root directory
* @param {(string|StringArray)} [options.static] - path of the directory (or directories) containing static files to serve
* @param {boolean} [options.trustProxy=false] - boolean indicating whether to trust `X-forwarded-by` headers when the server is sitting behind a proxy
* @param {boolean} [options.ignoreTrailingSlash=true] - boolean indicating whether to ignore trailing slashes in routes
* @throws {TypeError} must provide valid options
* @throws {Error} must provide valid options
* @returns {Function} function which creates an HTTP server
*
* @example
* var App = require( 'my-app' );
*
* var opts = {
*     'port': 7331,
*     'address': '0.0.0.0'
* };
* var createServer = httpServer( opts );
*
* function done( error, fastify ) {
*     if ( error ) {
*         return console.error( error.message );
*     }
*     console.log( 'Success!' );
*     fastify.close();
* }
*
* createServer( App, done );
*/
function httpServer( options ) {
	var opts;
	var err;
	var dir;
	var i;

	opts = copy( DEFAULTS );
	if ( arguments.length ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( opts.hostname === void 0 ) {
		opts.hostname = opts.address;
	}
	dir = cwd();
	opts.root = resolve( dir, opts.root );
	if ( opts.static ) {
		if ( isString( opts.static ) ) {
			if ( !isString( opts.prefix ) ) {
				throw new TypeError( format( 'invalid option. Must provide a string `prefix` when `static` is a string. Option: `%s`.', opts.prefix ) );
			}
			opts.static = resolve( dir, opts.static );
		} else {
			if ( !isString( opts.prefix ) && opts.prefix.length !== opts.static.length ) { // eslint-disable-line max-len
				throw new Error( 'invalid option. Number of prefixes must equal the number of static directories.' );
			}
			for ( i = 0; i < opts.static.length; i++ ) {
				opts.static[ i ] = resolve( dir, opts.static[ i ] );
			}
		}
	}
	return createServer;

	/**
	* Creates an HTTP server.
	*
	* @private
	* @param {Callback} done - function to invoke after creating a server
	* @throws {TypeError} first argument must be a function
	* @throws {Error} unable to load application template
	*/
	function createServer( done ) {
		var f;

		if ( !isFunction( done ) ) {
			throw new TypeError( format( 'invalid argument. First argument must be a function. Value: `%s`.', done ) );
		}

		// Create a fastify instance:
		f = fastify( opts );

		// Set basic security headers:
		f.register( helmet, {
			'contentSecurityPolicy': false,
			'crossOriginEmbedderPolicy': false,
			'referrerPolicy': {
				'policy': 'origin'
			},
			'hidePoweredBy': true
		});

		// Add support for reading cookies:
		f.register( cookie );

		// Decorate route handler `this` contexts with additional functionality:
		f.decorate( 'rootDir', opts.root );

		// Decorate each `request` object with a `locals` object for passing along intermediate results within middleware handlers:
		f.decorateRequest( 'locals', null );

		// Register a plugin for serving static files:
		f.register( fastifyStatic, {
			'root': opts.root,
			'prefix': opts.prefix,
			'wildcard': true
		});

		// Register routes:
		f.register( routes, {} );

		// Add a hook to perform clean-up tasks when the server is closed:
		f.addHook( 'onClose', onClose );

		// Add a hook to configure the `locals` object for each request:
		f.addHook( 'onRequest', onRequest );

		// Start listening for HTTP requests:
		f.listen( opts, onListen );

		/**
		* Callback invoked once a server is listening and ready to accept HTTP requests.
		*
		* @private
		* @param {(Error|null)} error - error object
		* @param {string} address - server address
		* @returns {void}
		*/
		function onListen( error, address ) {
			if ( error ) {
				f.log.error( error.message );
				return done( error );
			}
			f.log.info( 'HTTP server initialized. Server is listening for requests on %s.', address );
			done( null, f );
		}

		/**
		* Callback invoked upon receiving an HTTP request.
		*
		* @private
		* @param {Object} request - request object
		* @param {Object} reply - reply object
		* @param {Callback} clbk - callback to invoke once finished
		*/
		function onRequest( request, reply, clbk ) {
			request.locals = {};
			clbk();
		}

		/**
		* Callback invoked when a server is closed.
		*
		* @private
		* @param {Object} instance - fastify instance
		* @param {Callback} clbk - callback to invoke once finished
		*/
		function onClose( instance, clbk ) {
			setTimeout( onEnd, 0 );

			/**
			* Callback invoked upon performing clean-up tasks.
			*
			* @private
			*/
			function onEnd() {
				clbk();
			}
		}
	}
}


// EXPORTS //

module.exports = httpServer;
