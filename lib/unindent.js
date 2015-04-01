try {       var debug = require('debug')('unindent'); }
catch (_) {	var debug = function noop(){}; }


module.exports = unindent;

function unindent(code, opts) {
	if (!opts) opts = {};

	var overall;
	var tested = -1;
	var code = code.split(/\r\n|[\r\n]/);
	var lines;
	(function $$(){
		lines = code.slice();

		for (var i = 0, len = lines.length; i < len; ++i) {
			var line = lines[i];

			if (!line) continue;

			if (i > tested) {
				tested = i;
				var current = {
					indent: /^\s+|^/.exec(line)[0],
				}
				current.count = current.indent.length;

				if (opts.tabSize) {
					var tabs = current.indent.split("\t").length - 1;
					current.count = current.count + tabs * (opts.tabSize - 1);
				}

				if (!overall || current.count < overall.count) {
					overall = current;
					if (i > 0) {
						debug('Re-calulating indentation (@%d): %o', i, overall)
						return $$();
					}
					debug('Initial indentation: %o', overall)
				}
			}

			if (opts.trim && /^\s+$/.test(line)) {
				lines[i] = '';
				continue;
			}

			if (line.substr(0, overall.indent.length) === overall.indent) {
				line = line.substr(overall.indent.length);
			}

			if (opts.tabSize) {
				line = line.replace(/^\s+/, function (tabs) {
					var spaces = new Array(opts.tabSize + 1).join(' ');
					return tabs.replace(/\t/g, spaces);
				});
			}

			lines[i] = line;
		}
	})()

	code = lines.join('\n');

	return opts.trim ? code.trim() : code;
}