(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(factory);
	} else {
		// Browser globals
		root.rgb2hsl = factory();
	}
}(this, function () {

	function rgb2hsl () {

		// define h,s,l
		var h,s,l;

		// get options
		var rgb = Array.prototype.slice.call(arguments);

		rgb = rgb.map(function (v) {
			return v/255.0;
		});

		var max = Math.max.apply(null, rgb),
			min = Math.min.apply(null, rgb);

		var delta = max - min;

		// l
		l = (max + min) / 2.0;

		// h
		if (max === min) {
			h = 0;
		}
		else if (max === rgb[0] && rgb[1] >= rgb[2]) {
			h = 60 * ((rgb[1] - rgb[2]) / delta);
		}
		else if (max === rgb[0] && rgb[1] < rgb[2]) {
			h = 60 * ((rgb[1] - rgb[2]) / delta) + 360;
		}
		else if (max === rgb[1]) {
			h = 60 * ((rgb[2] - rgb[0]) / delta) + 120;
		}
		else if (max === rgb[2]) {
			h = 60 * ((rgb[0] - rgb[1]) / delta) + 240;
		}

		// s
		if (l === 0 || max === min) {
			s = 0;
		}
		else if (l > 0 && l <= 0.5) {
			s = delta / (2 * l);
		}
		else {
			s = delta / (2 - 2 * l);
		}

		return {
			h: h,
			s: s,
			l: l
		};
	}

	return rgb2hsl;
}));
