var through = require('through2');

module.exports = function(opt, info) {
	return through(function(buffer, encoding, callback) {
		var opentag = opt.tag || 'split';
		var collection = {};
		var name;
		var result = {};

		var regexpG = /\<split\s*name\=(?:"|')([^"']+)(?:"|')\s*?\>(.*?)\<\/split\>/g;
		var regexp = /\<split\s*name\=(?:"|')([^"']+)(?:"|')\s*?\>(.*?)\<\/split\>/;

		buffer.toString().match(regexpG).forEach(function(value) {
			var ret = value.match(regexp);
			if(ret && ret[1] && ret[2]) {
				result[ret[1]] = ret[2];
			}
		});

		callback(null, JSON.stringify(result));
	});
};