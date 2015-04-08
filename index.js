var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

var defaultFilename = 'checkstyle-result.xml';
var defaultLevel = 'ewi';
var defaultSourceDir = '';
var defaultBase = '';

var wrStream;
var filename;
var fEmpty = true;

module.exports = function (results, data, opts) {
	"use strict";
	var files = {},
	    out = [],
        file, severity, message, line, column, source,
	    pairs = {
			"&": "&amp;",
			'"': "&quot;",
			"'": "&apos;",
			"<": "&lt;",
			">": "&gt;"
		},
		severityCodes = {
			'e': 'error',
			'w': 'warning',
			'i': 'info'
		};
	
    opts = opts || {};
    opts.filename = opts.filename || defaultFilename;
	opts.level = opts.level || defaultLevel;
	opts.sourceDir = opts.sourceDir || defaultSourceDir;
	opts.base = opts.base || defaultBase;
	
	var lvlVisibility = {
		error: opts.level.indexOf('e') >= 0,
		warning: opts.level.indexOf('w') >= 0,
		info: opts.level.indexOf('i') >= 0
	};
	
	// normalize paths
	if (opts.base !== '') {
		opts.base = path.normalize(opts.base);
	}
	
	if (opts.sourceDir !== '') {
		opts.sourceDir = path.normalize(opts.sourceDir);
	}
	

    if (wrStream && filename !== opts.filename) {
      wrStream.end();
      wrStream = null;
    }
	
	// verifies if output file is still empty
	if(wrStream && fEmpty) {
		fEmpty = fs.statSync(opts.filename).size === 0;
	}
	
    if (!wrStream) {
	  mkdirp.sync(path.dirname(opts.filename))
      wrStream = fs.createWriteStream(opts.filename);
      filename = opts.filename;
    }
	
	
	function getSeverity (code) {
		return severityCodes[code.charAt(0).toLowerCase()] || '';
	}
	
	function encode (s) {
		for (var r in pairs) {
			if (typeof(s) !== "undefined") {
				s = s.replace(new RegExp(r, "g"), pairs[r]);
			}
		}
		return s || "";
	}
	
    function makeAttribute(attr, valueObject) {
		if (!valueObject[attr]) {
			throw Error('No property '+attr+' in error object');
		}

		return ' ' + attr + '="'+valueObject[attr]+'"';
	}
	
	function showLevel(sevCode) {
		return lvlVisibility[sevCode];
	}

    results.forEach(function (result) {
		// Register the file
		result.file = result.file.replace(/^\.\//, '');
		
		// checks if file path must be rebased
		if (opts.base !== '') {
			var bi = result.file.indexOf(opts.base);
			if (bi >= 0) {
				result.file =  result.file.substring(bi + opts.base.length);
			}
		}
		
		if (!files[result.file]) {
			files[result.file] = [];
		}
		var sevCode = getSeverity(result.error.code);
		//throw Error('severityCode:' + sevCode);
		if (showLevel(sevCode)) {
			// Add the error
			files[result.file].push({
				line: result.error.line,
				column: result.error.character,
				severity: sevCode,
				message: encode(result.error.reason),
				source: 'jshint.' + result.error.code
			});
		}
	});
	
	if(fEmpty) {
		out.push("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
		fEmpty = false;
	}
	out.push("<checkstyle version=\"4.3\">");

	Object.keys(files).forEach(function(file) {
		out.push('\t<file name="' + opts.sourceDir + file + '">');

		files[file].forEach(function(error) {

			line = makeAttribute('line', error);
			column = makeAttribute('column', error);
			severity = makeAttribute('severity', error);
			message = makeAttribute('message', error);
			source = makeAttribute('source', error);

			out.push('\t\t<error' + line + column + severity + message + source + ' />');
		});

		out.push('\t</file>');
	});

	out.push("</checkstyle>");

    wrStream.write(out.join('\n'));
};
