function Color(r, g, b) {
	this.r = r/255;
	this.g = g/255;
	this.b = b/255;

	function calcSaturation(delta, lightness) {
		if (delta == 0) {
			return 0;
		} else {
			var saturation;
			saturation = (delta / (1 - Math.abs(2*lightness - 1)));
			saturation /= 100;
			return saturation;
		}
	}

	function calcHue(r, g, b, cmax, cmin, delta) {
		if (delta == 0) {
			return 0;
		}

		var hue = 60;

		if (cmax == r) {
			hue *= ((g - b)/delta) % 6;
		} else if (cmax == g) {
			hue *= ((b - r)/delta) + 2;
		} else if (cmax == b) {
			hue *= ((r - g)/delta) + 4;
		}
		hue /= 360;
		return hue;
	}

	this.toHSL = function() {
		var cmax = Math.max(r, g, b);
		var cmin = Math.min(r, g, b);

		var delta = cmax - cmin;
		var lightness = (cmax + cmin) / 2;
		lightness /= 100;
		var saturation = calcSaturation(delta, lightness);
		var hue = calcHue(r, g, b, cmax, cmin, delta);

		var arr = [hue, saturation, lightness];
		return arr;
	}
}