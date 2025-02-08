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

// MAIN //

/**
* Callback invoked upon receiving an HTTP request.
*
* @private
* @param {Object} request - request object
* @param {Object} reply - reply object
* @returns {void}
*/
function handler( request, reply ) {
	var url;

	url = request.url;
	if ( url[ url.length-1 ] !== '/' ) {
		url += '/';
	}
	request.log.info( 'Resolved URL: %s', request.url );

	// Send the HTML shell to the client:
	reply.type( 'text/html' );
	reply.sendFile( 'index.html' );
}


// EXPORTS //

module.exports = handler;
