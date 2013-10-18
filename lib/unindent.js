module.exports = unindent;

function unindent(code, opts) {
	if (/^\s*$/.test(code)) return code;

	var tabSize = opts && opts.tabSize;

	code = code.replace(/^(\r\n|[\r\n])+/, '');

	var indent = /^\s+/.exec(code);
	if (indent) indent = indent[0];

	return code.split(/\r\n|[\r\n]/g).map(function (line) {
		if (indent && line.substr(0, indent.length) === indent) {
			line = line.substr(indent.length);
		}
		if (tabSize) {
			line = line.replace(/^\t+/g, function (tabs) {
				return tabs.replace(/\t/g, new Array(tabSize + 1).join(' '));
			});
		}
		return line;
	}).join('\n');
}