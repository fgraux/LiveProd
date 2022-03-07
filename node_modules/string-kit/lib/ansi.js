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

"use strict" ;



// To solve dependency hell, we do not rely on terminal-kit anymore.
const ansi = {
	reset: '\x1b[0m' ,
	bold: '\x1b[1m' ,
	dim: '\x1b[2m' ,
	italic: '\x1b[3m' ,
	underline: '\x1b[4m' ,
	inverse: '\x1b[7m' ,

	defaultColor: '\x1b[39m' ,
	black: '\x1b[30m' ,
	red: '\x1b[31m' ,
	green: '\x1b[32m' ,
	yellow: '\x1b[33m' ,
	blue: '\x1b[34m' ,
	magenta: '\x1b[35m' ,
	cyan: '\x1b[36m' ,
	white: '\x1b[37m' ,
	grey: '\x1b[90m' ,
	gray: '\x1b[90m' ,
	brightBlack: '\x1b[90m' ,
	brightRed: '\x1b[91m' ,
	brightGreen: '\x1b[92m' ,
	brightYellow: '\x1b[93m' ,
	brightBlue: '\x1b[94m' ,
	brightMagenta: '\x1b[95m' ,
	brightCyan: '\x1b[96m' ,
	brightWhite: '\x1b[97m' ,

	defaultBgColor: '\x1b[49m' ,
	bgBlack: '\x1b[40m' ,
	bgRed: '\x1b[41m' ,
	bgGreen: '\x1b[42m' ,
	bgYellow: '\x1b[43m' ,
	bgBlue: '\x1b[44m' ,
	bgMagenta: '\x1b[45m' ,
	bgCyan: '\x1b[46m' ,
	bgWhite: '\x1b[47m' ,
	bgGrey: '\x1b[100m' ,
	bgGray: '\x1b[100m' ,
	bgBrightBlack: '\x1b[100m' ,
	bgBrightRed: '\x1b[101m' ,
	bgBrightGreen: '\x1b[102m' ,
	bgBrightYellow: '\x1b[103m' ,
	bgBrightBlue: '\x1b[104m' ,
	bgBrightMagenta: '\x1b[105m' ,
	bgBrightCyan: '\x1b[106m' ,
	bgBrightWhite: '\x1b[107m'
} ;

module.exports = ansi ;



ansi.fgColor = {
	defaultColor: ansi.defaultColor ,
	black: ansi.black ,
	red: ansi.red ,
	green: ansi.green ,
	yellow: ansi.yellow ,
	blue: ansi.blue ,
	magenta: ansi.magenta ,
	cyan: ansi.cyan ,
	white: ansi.white ,
	grey: ansi.grey ,
	gray: ansi.gray ,
	brightBlack: ansi.brightBlack ,
	brightRed: ansi.brightRed ,
	brightGreen: ansi.brightGreen ,
	brightYellow: ansi.brightYellow ,
	brightBlue: ansi.brightBlue ,
	brightMagenta: ansi.brightMagenta ,
	brightCyan: ansi.brightCyan ,
	brightWhite: ansi.brightWhite
} ;



ansi.bgColor = {
	defaultColor: ansi.defaultBgColor ,
	black: ansi.bgBlack ,
	red: ansi.bgRed ,
	green: ansi.bgGreen ,
	yellow: ansi.bgYellow ,
	blue: ansi.bgBlue ,
	magenta: ansi.bgMagenta ,
	cyan: ansi.bgCyan ,
	white: ansi.bgWhite ,
	grey: ansi.bgGrey ,
	gray: ansi.bgGray ,
	brightBlack: ansi.bgBrightBlack ,
	brightRed: ansi.bgBrightRed ,
	brightGreen: ansi.bgBrightGreen ,
	brightYellow: ansi.bgBrightYellow ,
	brightBlue: ansi.bgBrightBlue ,
	brightMagenta: ansi.bgBrightMagenta ,
	brightCyan: ansi.bgBrightCyan ,
	brightWhite: ansi.bgBrightWhite
} ;



ansi.trueColor = ( r , g , b ) => {
	if ( g === undefined && typeof r === 'string' ) {
		let hex = r ;
		if ( hex[ 0 ] === '#' ) { hex = hex.slice( 1 ) ; }	// Strip the # if necessary
		if ( hex.length === 3 ) { hex = hex[ 0 ] + hex[ 0 ] + hex[ 1 ] + hex[ 1 ] + hex[ 2 ] + hex[ 2 ] ; }
		r = parseInt( hex.slice( 0 , 2 ) , 16 ) || 0 ;
		g = parseInt( hex.slice( 2 , 4 ) , 16 ) || 0 ;
		b = parseInt( hex.slice( 4 , 6 ) , 16 ) || 0 ;
	}

	return '\x1b[38;2;' + r + ';' + g + ';' + b + 'm' ;
} ;



ansi.bgTrueColor = ( r , g , b ) => {
	if ( g === undefined && typeof r === 'string' ) {
		let hex = r ;
		if ( hex[ 0 ] === '#' ) { hex = hex.slice( 1 ) ; }	// Strip the # if necessary
		if ( hex.length === 3 ) { hex = hex[ 0 ] + hex[ 0 ] + hex[ 1 ] + hex[ 1 ] + hex[ 2 ] + hex[ 2 ] ; }
		r = parseInt( hex.slice( 0 , 2 ) , 16 ) || 0 ;
		g = parseInt( hex.slice( 2 , 4 ) , 16 ) || 0 ;
		b = parseInt( hex.slice( 4 , 6 ) , 16 ) || 0 ;
	}

	return '\x1b[48;2;' + r + ';' + g + ';' + b + 'm' ;
} ;



const ANSI_CODES = {
	'0': null ,

	'1': { bold: true } ,
	'2': { dim: true } ,
	'22': { bold: false , dim: false } ,
	'3': { italic: true } ,
	'23': { italic: false } ,
	'4': { underline: true } ,
	'24': { underline: false } ,
	'5': { blink: true } ,
	'25': { blink: false } ,
	'7': { inverse: true } ,
	'27': { inverse: false } ,
	'8': { hidden: true } ,
	'28': { hidden: false } ,
	'9': { strike: true } ,
	'29': { strike: false } ,

	'30': { color: 0 } ,
	'31': { color: 1 } ,
	'32': { color: 2 } ,
	'33': { color: 3 } ,
	'34': { color: 4 } ,
	'35': { color: 5 } ,
	'36': { color: 6 } ,
	'37': { color: 7 } ,
	//'39': { defaultColor: true } ,
	'39': { color: 'default' } ,

	'90': { color: 8 } ,
	'91': { color: 9 } ,
	'92': { color: 10 } ,
	'93': { color: 11 } ,
	'94': { color: 12 } ,
	'95': { color: 13 } ,
	'96': { color: 14 } ,
	'97': { color: 15 } ,

	'40': { bgColor: 0 } ,
	'41': { bgColor: 1 } ,
	'42': { bgColor: 2 } ,
	'43': { bgColor: 3 } ,
	'44': { bgColor: 4 } ,
	'45': { bgColor: 5 } ,
	'46': { bgColor: 6 } ,
	'47': { bgColor: 7 } ,
	//'49': { bgDefaultColor: true } ,
	'49': { bgColor: 'default' } ,

	'100': { bgColor: 8 } ,
	'101': { bgColor: 9 } ,
	'102': { bgColor: 10 } ,
	'103': { bgColor: 11 } ,
	'104': { bgColor: 12 } ,
	'105': { bgColor: 13 } ,
	'106': { bgColor: 14 } ,
	'107': { bgColor: 15 }
} ;



// Parse ANSI codes, output is compatible with the markup parser
ansi.parse = str => {
	var ansiCodes , raw , part , style , output = [] ;

	for ( [ , ansiCodes , raw ] of str.matchAll( /\x1b\[([0-9;]+)m|(.[^\x1b]*)/g ) ) {
		if ( raw ) {
			if ( output.length ) { output[ output.length - 1 ].text += raw ; }
			else { output.push( { text: raw } ) ; }
		}
		else {
			ansiCodes.split( ';' ).forEach( ansiCode => {
				style = ANSI_CODES[ ansiCode ] ;
				if ( style === undefined ) { return ; }

				if ( ! output.length || output[ output.length - 1 ].text ) {
					if ( ! style ) {
						part = { text: '' } ;
					}
					else {
						part = Object.assign( {} , part , style ) ;
						part.text = '' ;
					}

					output.push( part ) ;
				}
				else {
					// There is no text, no need to create a new part
					if ( ! style ) {
						// Replace the last part
						output[ output.length - 1 ] = { text: '' } ;
					}
					else {
						// update the last part
						Object.assign( part , style ) ;
					}
				}
			} ) ;
		}
	}

	return output ;
} ;

