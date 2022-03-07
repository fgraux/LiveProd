/*
	String Kit

	Copyright (c) 2014 - 2021 Cédric Ronvel

	The MIT License (MIT)

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
*/

/*
	String formater, inspired by C's sprintf().
*/



"use strict" ;



const inspect = require( './inspect.js' ).inspect ;
const inspectError = require( './inspect.js' ).inspectError ;
const escape = require( './escape.js' ) ;
const ansi = require( './ansi.js' ) ;
const unicode = require( './unicode.js' ) ;
const naturalSort = require( './naturalSort.js' ) ;
const StringNumber = require( './StringNumber.js' ) ;



/*
	%%		a single %
	%s		string
	%S		string, interpret ^ formatting
	%r		raw string: without sanitizer
	%n		natural: output the most natural representation for this type, object entries are sorted by keys
	%N		even more natural: avoid type hinting marks like bracket for array
	%f		float
	%k		number with metric system prefixes
	%e		for exponential notation (e.g. 1.23e+2)
	%K		for scientific notation (e.g. 1.23 × 10²)
	%i	%d	integer
	%u		unsigned integer
	%U		unsigned positive integer (>0)
	%P		number to (absolute) percent (e.g.: 0.75 -> 75%)
	%p		number to relative percent (e.g.: 1.25 -> +25% ; 0.75 -> -25%)
	%t		time duration, convert ms into H:min:s
	%m		convert degree into degree, minutes and seconds
	%h		hexadecimal (input is a number)
	%x		hexadecimal (input is a number), force pair of symbols (e.g. 'f' -> '0f')
	%o		octal
	%b		binary
	%X		hexadecimal: convert a string into hex charcode, force pair of symbols (e.g. 'f' -> '0f')
	%z		base64
	%Z		base64url
	%O		object (like inspect, but with ultra minimal options)
	%I		call string-kit's inspect()
	%Y		call string-kit's inspect(), but do not inspect non-enumerable
	%E		call string-kit's inspectError()
	%J		JSON.stringify()
	%D		drop
	%F		filter function existing in the 'this' context, e.g. %[filter:%a%a]F
	%a		argument for a function

	Candidate format:
	%A		for automatic type? probably not good: it's like %n Natural
	%c		for char? (can receive a string or an integer translated into an UTF8 chars)
	%C		for currency formating?
	%B		for Buffer objects?
*/

exports.formatMethod = function( ... args ) {
	var arg ,
		str = args[ 0 ] ,
		autoIndex = 1 ,
		length = args.length ;

	if ( typeof str !== 'string' ) {
		if ( ! str ) { str = '' ; }
		else if ( typeof str.toString === 'function' ) { str = str.toString() ; }
		else { str = '' ; }
	}

	var runtime = {
		hasMarkup: false ,
		shift: null ,
		markupStack: []
	} ;

	if ( this.markupReset && this.startingMarkupReset ) {
		str = ( typeof this.markupReset === 'function' ? this.markupReset( runtime.markupStack ) : this.markupReset ) + str ;
	}

	//console.log( 'format args:' , arguments ) ;

	// /!\ each changes here should be reported on string.format.count() and string.format.hasFormatting() too /!\
	// Note: the closing bracket is optional to prevent ReDoS
	str = str.replace( /\^\[([^\]]*)]?|\^(.)|(%%)|%([+-]?)([0-9]*)(?:\[([^\]]*)\])?([a-zA-Z])/g ,
		( match , complexMarkup , markup , doublePercent , relative , index , modeArg , mode ) => {
			var replacement , i , tmp , fn , fnArgString , argMatches , argList = [] ;

			//console.log( 'replaceArgs:' , arguments ) ;
			if ( doublePercent ) { return '%' ; }

			if ( complexMarkup ) { markup = complexMarkup ; }
			if ( markup ) {
				if ( this.noMarkup ) { return '^' + markup ; }
				return markupReplace.call( this , runtime , match , markup ) ;
			}

			if ( index ) {
				index = parseInt( index , 10 ) ;

				if ( relative ) {
					if ( relative === '+' ) { index = autoIndex + index ; }
					else if ( relative === '-' ) { index = autoIndex - index ; }
				}
			}
			else {
				index = autoIndex ;
			}

			autoIndex ++ ;

			if ( index >= length || index < 1 ) { arg = undefined ; }
			else { arg = args[ index ] ; }

			if ( modes[ mode ] ) {
				replacement = modes[ mode ]( arg , modeArg , this ) ;
				if ( this.argumentSanitizer && ! modes[ mode ].noSanitize ) { replacement = this.argumentSanitizer( replacement ) ; }
				if ( modeArg && ! modes[ mode ].noCommonModeArg ) { replacement = commonModeArg( replacement , modeArg ) ; }
				return replacement ;
			}

			// Function mode
			if ( mode === 'F' ) {
				autoIndex -- ;	// %F does not eat any arg

				if ( modeArg === undefined ) { return '' ; }
				tmp = modeArg.split( ':' ) ;
				fn = tmp[ 0 ] ;
				fnArgString = tmp[ 1 ] ;
				if ( ! fn ) { return '' ; }

				if ( fnArgString && ( argMatches = fnArgString.match( /%([+-]?)([0-9]*)[a-zA-Z]/g ) ) ) {
					//console.log( argMatches ) ;
					//console.log( fnArgString ) ;
					for ( i = 0 ; i < argMatches.length ; i ++ ) {
						relative = argMatches[ i ][ 1 ] ;
						index = argMatches[ i ][ 2 ] ;

						if ( index ) {
							index = parseInt( index , 10 ) ;

							if ( relative ) {
								if ( relative === '+' ) { index = autoIndex + index ; }		// jshint ignore:line
								else if ( relative === '-' ) { index = autoIndex - index ; }	// jshint ignore:line
							}
						}
						else {
							index = autoIndex ;
						}

						autoIndex ++ ;

						if ( index >= length || index < 1 ) { argList[ i ] = undefined ; }
						else { argList[ i ] = args[ index ] ; }
					}
				}

				if ( ! this || ! this.fn || typeof this.fn[ fn ] !== 'function' ) { return '' ; }
				return this.fn[ fn ].apply( this , argList ) ;
			}

			return '' ;
		}
	) ;

	if ( runtime.hasMarkup && this.markupReset && this.endingMarkupReset ) {
		str += typeof this.markupReset === 'function' ? this.markupReset( runtime.markupStack ) : this.markupReset ;
	}

	if ( this.extraArguments ) {
		for ( ; autoIndex < length ; autoIndex ++ ) {
			arg = args[ autoIndex ] ;
			if ( arg === null || arg === undefined ) { continue ; }
			else if ( typeof arg === 'string' ) { str += arg ; }
			else if ( typeof arg === 'number' ) { str += arg ; }
			else if ( typeof arg.toString === 'function' ) { str += arg.toString() ; }
		}
	}

	return str ;
} ;



exports.markupMethod = function( str ) {
	if ( typeof str !== 'string' ) {
		if ( ! str ) { str = '' ; }
		else if ( typeof str.toString === 'function' ) { str = str.toString() ; }
		else { str = '' ; }
	}

	var runtime = {
		hasMarkup: false ,
		shift: null ,
		markupStack: []
	} ;

	if ( this.parse ) {
		let markupObjects , markupObject , match , complexMarkup , markup , raw , lastChunk ,
			output = [] ;

		// Note: the closing bracket is optional to prevent ReDoS
		for ( [ match , complexMarkup , markup , raw ] of str.matchAll( /\^\[([^\]]*)]?|\^(.)|([^^]+)/g ) ) {
			if ( raw ) {
				if ( output.length ) { output[ output.length - 1 ].text += raw ; }
				else { output.push( { text: raw } ) ; }
				continue ;
			}

			if ( complexMarkup ) { markup = complexMarkup ; }
			markupObjects = markupReplace.call( this , runtime , match , markup ) ;

			if ( ! Array.isArray( markupObjects ) ) { markupObjects = [ markupObjects ] ; }

			for ( markupObject of markupObjects ) {
				lastChunk = output.length ? output[ output.length - 1 ] : null ;
				if ( typeof markupObject === 'string' ) {
					// This markup is actually a text to add to the last chunk (e.g. "^^" markup is converted to a single "^")
					if ( lastChunk ) { lastChunk.text += markupObject ; }
					else { output.push( { text: markupObject } ) ; }
				}
				else if ( ! markupObject ) {
					// Null is for a markup's style reset
					if ( lastChunk && lastChunk.text.length && Object.keys( lastChunk ).length > 1 ) {
						// If there was style and text on the last chunk, then this means that the new markup starts a new chunk
						// markupObject can be null for markup reset function, but we have to create a new chunk
						output.push( { text: '' } ) ;
					}
				}
				else {
					if ( lastChunk && lastChunk.text.length ) {
						// If there was text on the last chunk, then this means that the new markup starts a new chunk
						output.push( Object.assign( { text: '' } , ... runtime.markupStack ) ) ;
					}
					else {
						// There wasn't any text added, so append the current markup style to the current chunk
						if ( lastChunk ) { Object.assign( lastChunk , markupObject ) ; }
						else { output.push( Object.assign( { text: '' } , markupObject ) ) ; }
					}
				}
			}
		}

		return output ;
	}

	if ( this.markupReset && this.startingMarkupReset ) {
		str = ( typeof this.markupReset === 'function' ? this.markupReset( runtime.markupStack ) : this.markupReset ) + str ;
	}

	str = str.replace( /\^\[([^\]]*)]?|\^(.)/g , ( match , complexMarkup , markup ) => markupReplace.call( this , runtime , match , complexMarkup || markup ) ) ;

	if ( runtime.hasMarkup && this.markupReset && this.endingMarkupReset ) {
		str += typeof this.markupReset === 'function' ? this.markupReset( runtime.markupStack ) : this.markupReset ;
	}

	return str ;
} ;



// Used by both formatMethod and markupMethod
function markupReplace( runtime , match , markup ) {
	var markupTarget , key , value , replacement , colonIndex ;

	if ( markup === '^' ) { return '^' ; }

	if ( this.shiftMarkup && this.shiftMarkup[ markup ] ) {
		runtime.shift = this.shiftMarkup[ markup ] ;
		return '' ;
	}

	if ( markup.length > 1 && this.dataMarkup && ( colonIndex = markup.indexOf( ':' ) ) !== -1 ) {
		key = markup.slice( 0 , colonIndex ) ;
		markupTarget = this.dataMarkup[ key ] ;

		if ( markupTarget === undefined ) {
			if ( this.markupCatchAll === undefined ) { return '' ; }
			markupTarget = this.markupCatchAll ;
		}

		runtime.hasMarkup = true ;
		value = markup.slice( colonIndex + 1 ) ;

		if ( typeof markupTarget === 'function' ) {
			replacement = markupTarget( runtime.markupStack , key , value ) ;
			// method should manage markup stack themselves
		}
		else {
			replacement = { [ markupTarget ]: value } ;
			stackMarkup( runtime , replacement ) ;
		}

		return replacement ;
	}

	if ( runtime.shift ) {
		markupTarget = this.shiftedMarkup?.[ runtime.shift ]?.[ markup ] ;
		runtime.shift = null ;
	}
	else {
		markupTarget = this.markup?.[ markup ] ;
	}

	if ( markupTarget === undefined ) {
		if ( this.markupCatchAll === undefined ) { return '' ; }
		markupTarget = this.markupCatchAll ;
	}

	runtime.hasMarkup = true ;

	if ( typeof markupTarget === 'function' ) {
		replacement = markupTarget( runtime.markupStack , markup ) ;
		// method should manage markup stack themselves
	}
	else {
		replacement = markupTarget ;
		stackMarkup( runtime , replacement ) ;
	}

	return replacement ;
}



// internal method for markupReplace()
function stackMarkup( runtime , replacement ) {
	if ( Array.isArray( replacement ) ) {
		for ( let item of replacement ) {
			if ( item === null ) { runtime.markupStack.length = 0 ; }
			else { runtime.markupStack.push( item ) ; }
		}
	}
	else {
		if ( replacement === null ) { runtime.markupStack.length = 0 ; }
		else { runtime.markupStack.push( replacement ) ; }
	}
}



// Note: the closing bracket is optional to prevent ReDoS
exports.stripMarkup = str => str.replace( /\^\[[^\]]*]?|\^./g , match =>
	match === '^^' ? '^' :
	match === '^ ' ? ' ' :
	''
) ;



const DEFAULT_FORMATTER = {
	argumentSanitizer: str => escape.control( str , true ) ,
	extraArguments: true ,
	color: false ,
	noMarkup: false ,
	endingMarkupReset: true ,
	startingMarkupReset: false ,
	markupReset: ansi.reset ,
	shiftMarkup: {
		'#': 'background'
	} ,
	markup: {
		":": ansi.reset ,
		" ": ansi.reset + " " ,

		"-": ansi.dim ,
		"+": ansi.bold ,
		"_": ansi.underline ,
		"/": ansi.italic ,
		"!": ansi.inverse ,

		"b": ansi.blue ,
		"B": ansi.brightBlue ,
		"c": ansi.cyan ,
		"C": ansi.brightCyan ,
		"g": ansi.green ,
		"G": ansi.brightGreen ,
		"k": ansi.black ,
		"K": ansi.brightBlack ,
		"m": ansi.magenta ,
		"M": ansi.brightMagenta ,
		"r": ansi.red ,
		"R": ansi.brightRed ,
		"w": ansi.white ,
		"W": ansi.brightWhite ,
		"y": ansi.yellow ,
		"Y": ansi.brightYellow
	} ,
	shiftedMarkup: {
		background: {
			":": ansi.reset ,
			" ": ansi.reset + " " ,

			"b": ansi.bgBlue ,
			"B": ansi.bgBrightBlue ,
			"c": ansi.bgCyan ,
			"C": ansi.bgBrightCyan ,
			"g": ansi.bgGreen ,
			"G": ansi.bgBrightGreen ,
			"k": ansi.bgBlack ,
			"K": ansi.bgBrightBlack ,
			"m": ansi.bgMagenta ,
			"M": ansi.bgBrightMagenta ,
			"r": ansi.bgRed ,
			"R": ansi.bgBrightRed ,
			"w": ansi.bgWhite ,
			"W": ansi.bgBrightWhite ,
			"y": ansi.bgYellow ,
			"Y": ansi.bgBrightYellow
		}
	} ,
	dataMarkup: {
		fg: ( markupStack , key , value ) => {
			var str = ansi.fgColor[ value ] || ansi.trueColor( value ) ;
			markupStack.push( str ) ;
			return str ;
		} ,
		bg: ( markupStack , key , value ) => {
			var str = ansi.bgColor[ value ] || ansi.bgTrueColor( value ) ;
			markupStack.push( str ) ;
			return str ;
		}
	} ,
	markupCatchAll: ( markupStack , key , value ) => {
		var str = '' ;

		if ( value === undefined ) {
			if ( key[ 0 ] === '#' ) {
				str = ansi.trueColor( key ) ;
			}
			else if ( typeof ansi[ key ] === 'string' ) {
				str = ansi[ key ] ;
			}
		}

		markupStack.push( str ) ;
		return str ;
	}
} ;

// Aliases
DEFAULT_FORMATTER.dataMarkup.color = DEFAULT_FORMATTER.dataMarkup.c = DEFAULT_FORMATTER.dataMarkup.fgColor = DEFAULT_FORMATTER.dataMarkup.fg ;
DEFAULT_FORMATTER.dataMarkup.bgColor = DEFAULT_FORMATTER.dataMarkup.bg ;



exports.createFormatter = ( options ) => exports.formatMethod.bind( Object.assign( {} , DEFAULT_FORMATTER , options ) ) ;
exports.format = exports.formatMethod.bind( DEFAULT_FORMATTER ) ;
exports.format.default = DEFAULT_FORMATTER ;

exports.createMarkup = ( options ) => exports.markupMethod.bind( Object.assign( {} , DEFAULT_FORMATTER , options ) ) ;
exports.markup = exports.markupMethod.bind( DEFAULT_FORMATTER ) ;



// Count the number of parameters needed for this string
exports.format.count = function( str , noMarkup = false ) {
	var markup , index , relative , autoIndex = 1 , maxIndex = 0 ;

	if ( typeof str !== 'string' ) { return 0 ; }

	// This regex differs slightly from the main regex: we do not count '%%' and %F is excluded
	// Note: the closing bracket is optional to prevent ReDoS
	var regexp = noMarkup ?
		/%([+-]?)([0-9]*)(?:\[[^\]]*\])?[a-zA-EG-Z]/g :
		/%([+-]?)([0-9]*)(?:\[[^\]]*\])?[a-zA-EG-Z]|(\^\[[^\]]*]?|\^.)/g ;

	for ( [ , relative , index , markup ] of str.matchAll( regexp ) ) {
		if ( markup ) { continue ; }

		if ( index ) {
			index = parseInt( index , 10 ) ;

			if ( relative ) {
				if ( relative === '+' ) { index = autoIndex + index ; }
				else if ( relative === '-' ) { index = autoIndex - index ; }
			}
		}
		else {
			index = autoIndex ;
		}

		autoIndex ++ ;

		if ( maxIndex < index ) { maxIndex = index ; }
	}

	return maxIndex ;
} ;



// Tell if this string contains formatter chars
exports.format.hasFormatting = function( str ) {
	if ( str.search( /\^(.?)|(%%)|%([+-]?)([0-9]*)(?:\[([^\]]*)\])?([a-zA-Z])/ ) !== -1 ) { return true ; }
	return false ;
} ;



// --- Format MODES ---

const modes = {} ;
exports.format.modes = modes ;	// <-- expose modes, used by Babel-Tower for String Kit interop'



// string
modes.s = arg => {
	if ( typeof arg === 'string' ) { return arg ; }
	if ( arg === null || arg === undefined || arg === true || arg === false ) { return '(' + arg + ')' ; }
	if ( typeof arg === 'number' ) { return '' + arg ; }
	if ( typeof arg.toString === 'function' ) { return arg.toString() ; }
	return '(' + arg + ')' ;
} ;

modes.r = arg => modes.s( arg ) ;
modes.r.noSanitize = true ;



// string, interpret ^ formatting
modes.S = ( arg , modeArg , options ) => {
	// We do the sanitizing part on our own
	var interpret = str => exports.markupMethod.call( options , options.argumentSanitizer ? options.argumentSanitizer( str ) : str ) ;

	if ( typeof arg === 'string' ) { return interpret( arg ) ; }
	if ( arg === null || arg === undefined || arg === true || arg === false ) { return '(' + arg + ')' ; }
	if ( typeof arg === 'number' ) { return '' + arg ; }
	if ( typeof arg.toString === 'function' ) { return interpret( arg.toString() ) ; }
	return interpret( '(' + arg + ')' ) ;
} ;

modes.S.noSanitize = true ;
modes.S.noCommonModeArg = true ;



// natural (WIP)
modes.N = ( arg , isSubCall ) => {
	if ( typeof arg === 'string' ) { return arg ; }

	if ( arg === null || arg === undefined || arg === true || arg === false ) {
		return '' + arg ;
	}

	if ( typeof arg === 'number' ) {
		return modes.f( arg , '.3g ' ) ;
	}

	if ( Array.isArray( arg ) ) {
		arg = arg.map( e => modes.N( e , true ) ) ;

		if ( isSubCall ) {
			return '[' + arg.join( ',' ) + ']' ;
		}

		return arg.join( ', ' ) ;
	}

	if ( Buffer.isBuffer( arg ) ) {
		arg = [ ... arg ].map( e => {
			e = e.toString( 16 ) ;
			if ( e.length === 1 ) { e = '0' + e ; }
			return e ;
		} ) ;
		return '<' + arg.join( ' ' ) + '>' ;
	}

	var proto = Object.getPrototypeOf( arg ) ;

	if ( proto === null || proto === Object.prototype ) {
		// Plain objects
		arg = Object.entries( arg ).sort( naturalSort )
			.map( e => e[ 0 ] + ': ' + modes.N( e[ 1 ] , true ) ) ;

		if ( isSubCall ) {
			return '{' + arg.join( ', ' ) + '}' ;
		}

		return arg.join( ', ' ) ;
	}

	if ( typeof arg.inspect === 'function' ) { return arg.inspect() ; }
	if ( typeof arg.toString === 'function' ) { return arg.toString() ; }

	return '(' + arg + ')' ;
} ;

modes.n = arg => modes.N( arg , true ) ;



// float
modes.f = ( arg , modeArg ) => {
	if ( typeof arg === 'string' ) { arg = parseFloat( arg ) ; }
	if ( typeof arg !== 'number' ) { arg = 0 ; }

	var subModes = floatModeArg( modeArg ) ,
		sn = new StringNumber( arg , '.' , subModes.groupSeparator ) ;

	if ( subModes.rounding !== null ) { sn.round( subModes.rounding ) ; }
	if ( subModes.precision ) { sn.precision( subModes.precision ) ; }

	return sn.toString( subModes.leftPadding , subModes.rightPadding , subModes.rightPaddingOnlyIfDecimal ) ;
} ;

modes.f.noSanitize = true ;



// absolute percent
modes.P = ( arg , modeArg ) => {
	if ( typeof arg === 'string' ) { arg = parseFloat( arg ) ; }
	if ( typeof arg !== 'number' ) { arg = 0 ; }

	arg *= 100 ;

	var subModes = floatModeArg( modeArg ) ,
		sn = new StringNumber( arg , '.' , subModes.groupSeparator ) ;

	// Force rounding to zero by default
	if ( subModes.rounding !== null || ! subModes.precision ) { sn.round( subModes.rounding || 0 ) ; }
	if ( subModes.precision ) { sn.precision( subModes.precision ) ; }

	return sn.toNoExpString( subModes.leftPadding , subModes.rightPadding , subModes.rightPaddingOnlyIfDecimal ) + '%' ;
} ;

modes.P.noSanitize = true ;



// relative percent
modes.p = ( arg , modeArg ) => {
	if ( typeof arg === 'string' ) { arg = parseFloat( arg ) ; }
	if ( typeof arg !== 'number' ) { arg = 0 ; }

	arg = ( arg - 1 ) * 100 ;

	var subModes = floatModeArg( modeArg ) ,
		sn = new StringNumber( arg , '.' , subModes.groupSeparator ) ;

	// Force rounding to zero by default
	if ( subModes.rounding !== null || ! subModes.precision ) { sn.round( subModes.rounding || 0 ) ; }
	if ( subModes.precision ) { sn.precision( subModes.precision ) ; }

	// 4th argument force a '+' sign
	return sn.toNoExpString( subModes.leftPadding , subModes.rightPadding , subModes.rightPaddingOnlyIfDecimal , true ) + '%' ;
} ;

modes.p.noSanitize = true ;



// metric system
modes.k = ( arg , modeArg ) => {
	if ( typeof arg === 'string' ) { arg = parseFloat( arg ) ; }
	if ( typeof arg !== 'number' ) { return '0' ; }

	var subModes = floatModeArg( modeArg ) ,
		sn = new StringNumber( arg , '.' , subModes.groupSeparator ) ;

	if ( subModes.rounding !== null ) { sn.round( subModes.rounding ) ; }
	// Default to 3 numbers precision
	if ( subModes.precision || subModes.rounding === null ) { sn.precision( subModes.precision || 3 ) ; }

	return sn.toMetricString( subModes.leftPadding , subModes.rightPadding , subModes.rightPaddingOnlyIfDecimal ) ;
} ;

modes.k.noSanitize = true ;



// exponential notation, a.k.a. "E notation" (e.g. 1.23e+2)
modes.e = ( arg , modeArg ) => {
	if ( typeof arg === 'string' ) { arg = parseFloat( arg ) ; }
	if ( typeof arg !== 'number' ) { arg = 0 ; }

	var subModes = floatModeArg( modeArg ) ,
		sn = new StringNumber( arg , '.' , subModes.groupSeparator ) ;

	if ( subModes.rounding !== null ) { sn.round( subModes.rounding ) ; }
	if ( subModes.precision ) { sn.precision( subModes.precision ) ; }

	return sn.toExponential() ;
} ;

modes.e.noSanitize = true ;



// scientific notation (e.g. 1.23 × 10²)
modes.K = ( arg , modeArg ) => {
	if ( typeof arg === 'string' ) { arg = parseFloat( arg ) ; }
	if ( typeof arg !== 'number' ) { arg = 0 ; }

	var subModes = floatModeArg( modeArg ) ,
		sn = new StringNumber( arg , '.' , subModes.groupSeparator ) ;

	if ( subModes.rounding !== null ) { sn.round( subModes.rounding ) ; }
	if ( subModes.precision ) { sn.precision( subModes.precision ) ; }

	return sn.toScientific() ;
} ;

modes.K.noSanitize = true ;



// integer
modes.d = modes.i = arg => {
	if ( typeof arg === 'string' ) { arg = parseFloat( arg ) ; }
	if ( typeof arg === 'number' ) { return '' + Math.floor( arg ) ; }
	return '0' ;
} ;

modes.i.noSanitize = true ;



// unsigned integer
modes.u = arg => {
	if ( typeof arg === 'string' ) { arg = parseFloat( arg ) ; }
	if ( typeof arg === 'number' ) { return '' + Math.max( Math.floor( arg ) , 0 ) ; }
	return '0' ;
} ;

modes.u.noSanitize = true ;



// unsigned positive integer
modes.U = arg => {
	if ( typeof arg === 'string' ) { arg = parseFloat( arg ) ; }
	if ( typeof arg === 'number' ) { return '' + Math.max( Math.floor( arg ) , 1 ) ; }
	return '1' ;
} ;

modes.U.noSanitize = true ;



// /!\ Should use StringNumber???
// Degree, minutes and seconds.
// Unlike %t which receive ms, here the input is in degree.
modes.m = arg => {
	if ( typeof arg === 'string' ) { arg = parseFloat( arg ) ; }
	if ( typeof arg !== 'number' ) { return '(NaN)' ; }

	var minus = '' ;
	if ( arg < 0 ) { minus = '-' ; arg = -arg ; }

	var degrees = epsilonFloor( arg ) ,
		frac = arg - degrees ;

	if ( ! frac ) { return minus + degrees + '°' ; }

	var minutes = epsilonFloor( frac * 60 ) ,
		seconds = epsilonFloor( frac * 3600 - minutes * 60 ) ;

	if ( seconds ) {
		return minus + degrees + '°' + ( '' + minutes ).padStart( 2 , '0' ) + '′' + ( '' + seconds ).padStart( 2 , '0' ) + '″' ;
	}

	return minus + degrees + '°' + ( '' + minutes ).padStart( 2 , '0' ) + '′' ;

} ;

modes.m.noSanitize = true ;



// /!\ Should use StringNumber???
// time duration, transform ms into H:min:s
// Later it should format Date as well: number=duration, date object=date
// Note that it would not replace moment.js, but it could uses it.
modes.t = arg => {
	if ( typeof arg === 'string' ) { arg = parseFloat( arg ) ; }
	if ( typeof arg !== 'number' ) { return '(NaN)' ; }

	var s = Math.floor( arg / 1000 ) ;
	if ( s < 60 ) { return s + 's' ; }

	var min = Math.floor( s / 60 ) ;
	s = s % 60 ;
	if ( min < 60 ) { return min + 'min' + ( '' + s ).padStart( 2 , '0' ) + 's' ; }

	var h = Math.floor( min / 60 ) ;
	min = min % 60 ;
	//if ( h < 24 ) { return h + 'h' + zeroPadding( min ) +'min' + zeroPadding( s ) + 's' ; }

	return h + 'h' + ( '' + min ).padStart( 2 , '0' ) + 'min' + ( '' + s ).padStart( 2 , '0' ) + 's' ;
} ;

modes.t.noSanitize = true ;



// unsigned hexadecimal
modes.h = arg => {
	if ( typeof arg === 'string' ) { arg = parseFloat( arg ) ; }
	if ( typeof arg === 'number' ) { return '' + Math.max( Math.floor( arg ) , 0 ).toString( 16 ) ; }
	return '0' ;
} ;

modes.h.noSanitize = true ;



// unsigned hexadecimal, force pair of symboles
modes.x = arg => {
	if ( typeof arg === 'string' ) { arg = parseFloat( arg ) ; }
	if ( typeof arg !== 'number' ) { return '00' ; }

	var value = '' + Math.max( Math.floor( arg ) , 0 ).toString( 16 ) ;

	if ( value.length % 2 ) { value = '0' + value ; }
	return value ;
} ;

modes.x.noSanitize = true ;



// unsigned octal
modes.o = arg => {
	if ( typeof arg === 'string' ) { arg = parseFloat( arg ) ; }
	if ( typeof arg === 'number' ) { return '' + Math.max( Math.floor( arg ) , 0 ).toString( 8 ) ; }
	return '0' ;
} ;

modes.o.noSanitize = true ;



// unsigned binary
modes.b = arg => {
	if ( typeof arg === 'string' ) { arg = parseFloat( arg ) ; }
	if ( typeof arg === 'number' ) { return '' + Math.max( Math.floor( arg ) , 0 ).toString( 2 ) ; }
	return '0' ;
} ;

modes.b.noSanitize = true ;



// String to hexadecimal, force pair of symboles
modes.X = arg => {
	if ( typeof arg === 'string' ) { arg = Buffer.from( arg ) ; }
	else if ( ! Buffer.isBuffer( arg ) ) { return '' ; }
	return arg.toString( 'hex' ) ;
} ;

modes.X.noSanitize = true ;



// base64
modes.z = arg => {
	if ( typeof arg === 'string' ) { arg = Buffer.from( arg ) ; }
	else if ( ! Buffer.isBuffer( arg ) ) { return '' ; }
	return arg.toString( 'base64' ) ;
} ;



// base64url
modes.Z = arg => {
	if ( typeof arg === 'string' ) { arg = Buffer.from( arg ) ; }
	else if ( ! Buffer.isBuffer( arg ) ) { return '' ; }
	return arg.toString( 'base64' ).replace( /\+/g , '-' )
		.replace( /\//g , '_' )
		.replace( /[=]{1,2}$/g , '' ) ;
} ;



// Inspect
const I_OPTIONS = {} ;
modes.I = ( arg , modeArg , options ) => genericInspectMode( arg , modeArg , options , I_OPTIONS ) ;
modes.I.noSanitize = true ;



// More minimalist inspect
const Y_OPTIONS = {
	noFunc: true ,
	enumOnly: true ,
	noDescriptor: true ,
	useInspect: true ,
	useInspectPropertyBlackList: true
} ;
modes.Y = ( arg , modeArg , options ) => genericInspectMode( arg , modeArg , options , Y_OPTIONS ) ;
modes.Y.noSanitize = true ;



// Even more minimalist inspect
const O_OPTIONS = { minimal: true , noIndex: true } ;
modes.O = ( arg , modeArg , options ) => genericInspectMode( arg , modeArg , options , O_OPTIONS ) ;
modes.O.noSanitize = true ;



// Inspect error
const E_OPTIONS = {} ;
modes.E = ( arg , modeArg , options ) => genericInspectMode( arg , modeArg , options , E_OPTIONS , true ) ;
modes.E.noSanitize = true ;



// JSON
modes.J = arg => arg === undefined ? 'null' : JSON.stringify( arg ) ;



// drop
modes.D = () => '' ;
modes.D.noSanitize = true ;



// ModeArg formats

// The format for commonModeArg
const COMMON_MODE_ARG_FORMAT_REGEX = /([a-zA-Z])(.[^a-zA-Z]*)/g ;

// The format for specific mode arg
const MODE_ARG_FORMAT_REGEX = /([a-zA-Z]|^)(.[^a-zA-Z]*)/g ;



// Called when there is a modeArg and the mode allow common mode arg
// CONVENTION: reserve upper-cased letters for common mode arg
function commonModeArg( str , modeArg ) {
	var match , k , v ;

	COMMON_MODE_ARG_FORMAT_REGEX.lastIndex = 0 ;

	while ( ( match = COMMON_MODE_ARG_FORMAT_REGEX.exec( modeArg ) ) ) {
		[ , k , v ] = match ;

		if ( k === 'L' ) {
			let width = unicode.width( str ) ;
			v = + v || 1 ;

			if ( width > v ) {
				str = unicode.truncateWidth( str , v - 1 ).trim() + '…' ;
				width = unicode.width( str ) ;
			}

			if ( width < v ) { str = ' '.repeat( v - width ) + str ; }
		}
		else if ( k === 'R' ) {
			let width = unicode.width( str ) ;
			v = + v || 1 ;

			if ( width > v ) {
				str = unicode.truncateWidth( str , v - 1 ).trim() + '…' ;
				width = unicode.width( str ) ;
			}

			if ( width < v ) { str = str + ' '.repeat( v - width ) ; }
		}
	}

	return str ;
}



const FLOAT_MODES = {
	leftPadding: 1 ,
	rightPadding: 0 ,
	rightPaddingOnlyIfDecimal: false ,
	rounding: null ,
	precision: null ,
	groupSeparator: ''
} ;

// Generic number modes
function floatModeArg( modeArg ) {
	var match , k , v , lv ;

	FLOAT_MODES.leftPadding = 1 ;
	FLOAT_MODES.rightPadding = 0 ;
	FLOAT_MODES.rightPaddingOnlyIfDecimal = false ;
	FLOAT_MODES.rounding = null ;
	FLOAT_MODES.precision = null ;
	FLOAT_MODES.groupSeparator = '' ;

	if ( modeArg ) {
		MODE_ARG_FORMAT_REGEX.lastIndex = 0 ;

		while ( ( match = MODE_ARG_FORMAT_REGEX.exec( modeArg ) ) ) {
			[ , k , v ] = match ;

			if ( k === 'z' ) {
				// Zero-left padding
				FLOAT_MODES.leftPadding = + v ;
			}
			else if ( k === 'g' ) {
				// Group separator
				FLOAT_MODES.groupSeparator = v || ' ' ;
			}
			else if ( ! k ) {
				if ( v === 'g' ) {
					// Group separator
					FLOAT_MODES.groupSeparator = ' ' ;
				}
				else if ( v[ 0 ] === '.' ) {
					// Rounding after the decimal
					lv = v[ v.length - 1 ] ;

					// Zero-right padding?
					if ( lv === '!' ) {
						FLOAT_MODES.rounding = FLOAT_MODES.rightPadding = parseInt( v.slice( 1 , -1 ) , 10 ) || 0 ;
					}
					else if ( lv === '?' ) {
						FLOAT_MODES.rounding = FLOAT_MODES.rightPadding = parseInt( v.slice( 1 , -1 ) , 10 ) || 0 ;
						FLOAT_MODES.rightPaddingOnlyIfDecimal = true ;
					}
					else {
						FLOAT_MODES.rounding = parseInt( v.slice( 1 ) , 10 ) || 0 ;
					}
				}
				else if ( v[ v.length - 1 ] === '.' ) {
					// Rounding before the decimal
					FLOAT_MODES.rounding = -parseInt( v.slice( 0 , -1 ) , 10 ) || 0 ;
				}
				else {
					// Precision, but only if integer
					FLOAT_MODES.precision = parseInt( v , 10 ) || null ;
				}
			}
		}
	}

	return FLOAT_MODES ;
}



// Generic inspect
function genericInspectMode( arg , modeArg , options , modeOptions , isInspectError = false ) {
	var match , k , v ,
		outputMaxLength ,
		maxLength ,
		depth = 3 ,
		style = options && options.color ? 'color' : 'none' ;

	if ( modeArg ) {
		MODE_ARG_FORMAT_REGEX.lastIndex = 0 ;

		while ( ( match = MODE_ARG_FORMAT_REGEX.exec( modeArg ) ) ) {
			[ , k , v ] = match ;

			if ( k === 'c' ) {
				if ( v === '+' ) { style = 'color' ; }
				else if ( v === '-' ) { style = 'none' ; }
			}
			else if ( k === 'l' ) {
				// total output max length
				outputMaxLength = parseInt( v , 10 ) || undefined ;
			}
			else if ( k === 's' ) {
				// string max length
				maxLength = parseInt( v , 10 ) || undefined ;
			}
			else if ( ! k ) {
				depth = parseInt( v , 10 ) || 1 ;
			}
		}
	}

	if ( isInspectError ) {
		return inspectError( Object.assign( {
			depth , style , outputMaxLength , maxLength
		} , modeOptions ) , arg ) ;
	}

	return inspect( Object.assign( {
		depth , style , outputMaxLength , maxLength
	} , modeOptions ) , arg ) ;
}



// From math-kit module
// /!\ Should be updated with the new way the math-kit module do it!!! /!\
const EPSILON = 0.0000000001 ;
const INVERSE_EPSILON = Math.round( 1 / EPSILON ) ;

function epsilonRound( v ) {
	return Math.round( v * INVERSE_EPSILON ) / INVERSE_EPSILON ;
}

function epsilonFloor( v ) {
	return Math.floor( v + EPSILON ) ;
}

// Round with precision
function round( v , step ) {
	// use: v * ( 1 / step )
	// not: v / step
	// reason: epsilon rounding errors
	return epsilonRound( step * Math.round( v * ( 1 / step ) ) ) ;
}

