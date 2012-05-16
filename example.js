/*
Copyright (c) 2012 James Shore

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// Let's Code: Test-Driven Javascript
// LetsCodeJavascript.com
//
// Lessons Learned: Lint & Javascript
//
// Example code

EXAMPLE_GLOBAL = "foo";

(function() {
	"use strict";
	var jshint = require("jshint").JSHINT;

	function lintFile(filename, options, globals) {
		var sourceCode = require("fs").readFileSync(filename, "utf8");
		var pass = jshint(sourceCode, options, globals);

		if (pass) {
			console.log(filename + " ok");
		}
		else {
			console.log(filename + " failed");
			for (var i = 0; i < jshint.errors.length; i++) {
				var error = jshint.errors[i];
				if (error) {
					if (error.evidence) console.log(error.line + ": " + error.evidence.trim());
					console.log("   " + error.reason);
				}
			}
		}
		return pass;
	}

	function lintFileList(filenameList, options, globals) {
		var allPass = true;
		filenameList.forEach(function(filename) {
			var pass = lintFile(filename, options, globals);
			allPass = allPass && pass;
		});
		return allPass;
	}

	var options = {
		bitwise: true,
		curly: false,
		eqeqeq: true,
		forin: true,
		immed: true,
		latedef: true,
		newcap: true,
		noarg: true,
		noempty: true,
		nonew: true,
		regexp: true,
		undef: true,
		strict: true,
		trailing: true,
		node: true
	};

	var globals = {
		EXAMPLE_GLOBAL: true
	};

	var filenames = [
		"./example.js"
	];

	lintFileList(filenames, options, globals);
}());
