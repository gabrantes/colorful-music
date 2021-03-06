function Color(r, g, b) {
	this.r = r/255;
	this.g = g/255;
	this.b = b/255;

	/**
	 * Calculates the saturation
	 *
	 * @return the saturation value, ranging from 0 to 1
	 */
	function calcSaturation(delta, lightness) {
		if (delta == 0) {
			return 0;
		} else {
			var saturation;
			saturation = (delta / (1 - Math.abs(2*lightness - 1)));
			saturation;
			return saturation;
		}
	}

	/**
	 * Calculates the hue
	 *
	 * @return the hue value, ranging from 0 to 1
	 */
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

	/**
	 * Uses the RGB values stored in the object to calculate the HSL conversion
	 *
	 * @return an array for the HSL values, of format [hue, saturation, lightness]
	 */
	this.toHSL = function() {
		var cmax = Math.max(this.r, this.g, this.b);
		var cmin = Math.min(this.r, this.g, this.b);

		var delta = cmax - cmin;
		var lightness = (cmax + cmin) / 2;
		lightness;
		var saturation = calcSaturation(delta, lightness);
		var hue = calcHue(this.r, this.g, this.b, cmax, cmin, delta);

		var arr = [hue, saturation, lightness];
		return arr;
	}
}