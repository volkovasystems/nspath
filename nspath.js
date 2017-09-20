"use strict";

/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2017 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"package": "nspath",
			"path": "nspath/nspath.js",
			"file": "nspath.js",
			"module": "nspath",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/nspath.git",
			"test": "nspath-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Insert path to user PATH environment variable.
	@end-module-documentation

	@include:
		{
			"child": "child_process",
			"depher": "depher",
			"falzy": "falzy",
			"gnaw": "gnaw",
			"harden": "harden",
			"kept": "kept",
			"nsrt": "nsrt",
			"outre": "outre",
			"pedon": "pedon",
			"raze": "raze"
		}
	@end-include
*/

const child = require( "child_process" );
const depher = require( "depher" );
const falzy = require( "falzy" );
const gnaw = require( "gnaw" );
const harden = require( "harden" );
const kept = require( "kept" );
const nsrt = require( "nsrt" );
const outre = require( "outre" );
const pedon = require( "pedon" );
const raze = require( "raze" );

harden( "EVALUATE_PATH", Symbol( "evaluate-path" ) );
harden( "TRUE_PATH", Symbol( "true-path" ) );

const PATH_VARIABLE = ( ( ) => {
	if( pedon.WINDOWS ){
		return "%PATH%";

	}else{
		return "$PATH";
	}
} )( );

const nspath = function nspath( path, mode, synchronous ){
	/*;
		@meta-configuration:
			{
				"path": "string".
				"mode": [
					"function",
					"symbol"
				],
				"synchronous": "boolean"
			}
		@end-meta-configuration
	*/

	if( falzy( path ) || typeof path != "string" ){
		throw new Error( "invalid path" );
	}

	let parameter = raze( arguments );

	synchronous = depher( parameter, BOOLEAN, false );

	mode = depher( parameter, [ SYMBOL, FUNCTION ], TRUE_PATH );

	if( synchronous ){
		if( !kept( path, true ) && mode === EVALUATE_PATH ){
			try{
				path = gnaw( path, true );

			}catch( error ){
				throw new Error( `cannot evaluate path, ${ error.stack }` );
			}
		}

		if( pedon.WINDOWS ){
			try{
				path = nsrt( outre( gnaw( `echo ${ PATH_VARIABLE }`, true ).split( ";" ) ), path ).join( ";" );

				child.execSync( `setx path "${ path }"` );

				return gnaw( `echo ${ PATH_VARIABLE }`, true );

			}catch( error ){
				throw new Error( `cannot insert path, ${ error.stack }` );
			}

		}else if( pedon.LINUX ){
			throw new Error( "linux platform not currently supported" );

		}else if( pedon.OSX ){
			throw new Error( "osx platform not currently supported" );

		}else{
			throw new Error( "platform not currently supported" );
		}

	}else{
		throw new Error( "non-synchronous version not currently supported" );
	}
};

module.exports = nspath;
