module.exports = unindent;

function unindent(code, opts) {
	if (!opts) opts = {};

	var indent;
	var lines = code.split(/\r\n|[\r\n]/);
	for (var i = 0, len = lines.length; i < len; ++i) {
		var line = lines[i];

		if (!line) continue;

		if (!indent) {
			indent = /^\s+/.exec(line);
			// first non empty line has no indent
			// no need to unindent rest lines
			if (!indent) break;
			indent = indent[0];
		}

		if (opts.trim && /^\s+$/.test(line)) {
			lines[i] = '';
			continue;
		}

		if (line.substr(0, indent.length) === indent) {
			line = line.substr(indent.length);
		}

		if (opts.tabSize) {
			line = line.replace(/^\t+/, function (tabs) {
				var spaces = new Array(opts.tabSize + 1).join(' ');
				return tabs.replace(/\t/g, spaces);
			});
		}

		lines[i] = line;
	}

	code = lines.join('\n');

	return opts.trim ? code.trim() : code;
}