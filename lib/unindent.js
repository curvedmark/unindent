var indentRe = /^\s+/;
var tabRe = /^\t+/g;
var nlRe = /\r\n|[\r\n]/;

module.exports = unindent;

function unindent(code, opts) {
	var tabSize = opts && opts.tabSize;

	var indent = indentRe.exec(code);
	if (indent) indent = indent[0];

	return code.split(nlRe).map(function (line) {
		if (indent && line.substr(0, indent.length) === indent) {
			line = line.substr(indent.length);
		}
		if (tabSize) {
			line = line.replace(tabRe, function (tabs) {
				return tabs.replace(/\t/g, new Array(tabSize + 1).join(' '));
			});
		}
		return line;
	}).join('\n');
}