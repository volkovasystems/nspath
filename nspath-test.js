
const assert = require( "assert" );
const nspath = require( "./nspath.js" );

assert.equal( nspath( "%SystemRoot%", true ).split( ";" ).some( ( path ) => path === "C:\\WINDOWS" ), true, "should be contained" );

console.log( "ok" );
