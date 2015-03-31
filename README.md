
## Information

<table>
<tr>
<td>Package</td><td>gulp-jshint-jenkins-reporter</td>
</tr>
<tr>
<td>Description</td>
<td>Advanced reporter for gulp-jshint to be used by Jenkins (Hudson). Writes output to an xml file.</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.3</td>
</tr>
</table>

## Install

    npm install gulp-jshint-jenkins-reporter --save-dev

## Usage

```javascript
var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('lint', function() {
  return gulp.src('./lib/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('gulp-jshint-jenkins-reporter'));
});
```
This will output the report to checkstyle-result.xml


## Advances usage

```javascript
var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('lint', function() {
  return gulp.src('./lib/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('gulp-jshint-jenkins-reporter', {
      filename: __reports + '/jshint-checkstyle.xml',
	  level: 'e', 
	  base:'src/', 
	  sourceDir:'path/to/repo/'
    }));
});
```

## Options

Plugin options:

Type: `filename`
Default: `"checkstyle-result.xml"`

The filename to write output from jshint. When linting is successfull, the file is not created.


Type: `level`
Default: `"ewi"`

The level of severity you want the report to catch. e: error, w: warning,  i: info. can be
any combination of the three letters.


Type: `base`
Default: `""`

If given, the path of the files will be rebased according to the value. For instance:
if your file path is `C:/git/src/myApp/js/somejsfile.js` and you set base with `src/` then the xml will 
contain the following path : `myApp/js/somejsfile.js`
For Windows backslash are used.


Type: `sourceDir`
Default: `""`

If given, the path of the files will be prefixed with the sourceDir. For instance:
if your file path is `C:/git/src/myApp/js/somejsfile.js` and you set base with `src/` and set sourceDir with `someplace/else/`
then the xml will contain the following path : `someplace/else/myApp/js/somejsfile.js`
For Windows backslash are used.

## LICENSE

The MIT License (MIT)

Copyright (c) 2014 Igor DeFaye

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
