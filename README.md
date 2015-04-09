
## Information

<table>
<tr>
<td>Package</td><td>gulp-jshint-jenkins-reporter</td>
</tr>
<tr>
<td>Description</td>
<td>Advanced reporter for gulp-jshint and gulp-jscs to be used by Jenkins (Hudson). Writes output to an xml file.</td>
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

## Using it with JSCS
You can also obtain reports for JSCS. For this you will need an extra plugin: [gulp-jscs-stylish](https://www.npmjs.com/package/gulp-jscs-stylish "gulp-jscs-stylish").

    npm install gulp-jscs-stylish --save-dev

```javascript
var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('lint', function() {
  return gulp.src('./lib/*.js')
    .pipe(jshint())    // optional if you want jshint to be runned
    .pipe($.jscs())
    .on('error', function(){})
	.pipe($.jscsStylish.combineWithHintResults())
    .pipe(jshint.reporter('gulp-jshint-jenkins-reporter'));
});
```
You will notice that errors from jscs and jshint are marked differently in the checkfile, so you know which error came from where.

## LICENSE

The MIT License (MIT)

Copyright (c) 2014 Igor DeFaye
