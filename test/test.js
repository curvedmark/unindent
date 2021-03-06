var assert = require('assert');
var unindent = require('..');

it("should unindent tab-indented code", function () {
	var code = [
		'	a',
		'		b',
		'	  c'
	].join('\n');
	var unindented = [
		'a',
		'	b',
		'  c'
	].join('\n');

	assert.equal(unindent(code), unindented);
});

it("should unindent space-indented code", function () {
	var code = [
		'  a',
		'  	b',
		'    c'
	].join('\n');
	var unindented = [
		'a',
		'	b',
		'  c'
	].join('\n');

	assert.equal(unindent(code), unindented);
});

it("should be able to convert tabs in code", function () {
	var code = [
		'	a',
		'		b',
		'	  c'
	].join('\n');
	var unindented = [
		'a',
		'    b',
		'  c'
	].join('\n');

	assert.equal(unindent(code, { tabSize: 4 }), unindented);
});

it("should ignore leading new lines", function () {
	var code = [
		'',
		'	a',
		'		b',
		'	  c'
	].join('\n');
	var unindented = [
		'',
		'a',
		'	b',
		'  c'
	].join('\n');

	assert.equal(unindent(code), unindented);
});

it("should support trim", function () {
	var code = [
		'	',
		'	a',
		'		',
		'		b',
		'	  c',
		'	'
	].join('\n');
	var unindented = [
		'a',
		'',
		'	b',
		'  c'
	].join('\n');

	assert.equal(unindent(code, { trim: true }), unindented);
});