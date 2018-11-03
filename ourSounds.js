var mySound = new Pizzicato.Sound({
    source: 'wave',
    options: {
        type:  'triangle',
        frequency: 440, // A
        release: 0.2
    }
});

/**
 * This function transposes a sound up by a minor third
 *
 * @param sound The sound object to be transposed
 */
function incrementSound(sound) {
    sound.frequency *= (6/5);
}

/**
 * This function transposes a sound down by a minor third
 *
 * @param sound The sound object to be transposed
 */
function decrementSound(sound) {
    sound.frequency *= (5/6);
}

/**
 * This function stops a sound, and resets it to 440Hz
 *
 * @param sound The sound object to be stopped
 */
function stopSound(sound) {
    sound.stop();
    sound.frequency = 440; // resets to original frequency
}

/**
 * An object for storing hue (h), saturation (s), lightness (l)
 */
function HSL_obj(h, s, l) {
    this.h = h;
    this.s = s;
    this.l = l;
}

/**
 * An object for storing red (r), green (g), blue (b)
 */
function RGB_obj(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
}

/**
 * Takes a RGB object and returns a normalized version of the object,
 * where each value has been divided by 255.
 * In the normalized version, values range from 0 to 1.
 */
function RGB_norm(rgb) {
    var rgb_norm_obj = RGB_obj(rgb.r/2.55, rgb.g/2.55, rgb.b/2.55);
    return rgb_norm_obj;
}

/**
 * Takes a normalized RGB and returns its lightness value
 *
 * @param rgb_norm A normalized RGB_obj
 * @return The lightness value from 0-1
 */
function lightness(rgb_norm) {
    var c_max = Math.max(rgb_norm.r, rgb_norm.g, rgb_norm.b);
    var c_min = Math.min(rgb_norm.r, rgb_norm.g, rgb_norm.b);
    var light = (c_max + c_min)/2;
    return light;
}

/**
 * Takes a normalized RGB and returns its saturation value
 *
 * @param rgb_norm A normalized RGB_obj
 * @return The saturation value from 0-1
 */
function saturation(rgb_norm) {
    var c_max = Math.max(rgb_norm.r, rgb_norm.g, rgb_norm.b);
    var c_min = Math.min(rgb_norm.r, rgb_norm.g, rgb_norm.b);
    var L = lightness(rgb_norm);

    var delta = (c_max - c_min);
    if (delta == 0) {
        return 0;
    } else {
        return delta / (1 - Math.abs(2*L - 1));
    }
}

/**
 * Takes a normalized RGB and returns its hue value
 *
 * @param rgb_norm A normalized RGB_obj
 * @return The hue value from 0 - 360
 */
function hue(rgb_norm) {
    var c_max = Math.max(rgb_norm.r, rgb_norm.g, rgb_norm.b);
    var c_min = Math.min(rgb_norm.r, rgb_norm.g, rgb_norm.b);
    var delta = (c_max - c_min);

    if (delta == 0) {
        return 0;
    }

    if (c_max == rgb_norm.r) {
        return (60 * (((rgb_norm.g - rgb_norm.b)/delta) % 6));
    }

    if (c_max == rgb_norm.g) {
        return (60 * (((rgb_norm.b - rgb_norm.r)/delta) + 2));
    }

    if (c_max == rgb_norm.b) {
        return (60 * (((rgb_norm.r - rgb_norm.g)/delta) + 4));
    }
}

/**
 * Takes an RGB value and returns an HSL object
 *
 * @param r, g, b The RGB values, each ranging from 0 to 255
 */
function RGBtoHSL(r, g, b) {
    var myRGB = new RGB_obj(r, g, b);
    var myRGB_norm = RGB_norm(myRGB);

    var h = hue(myRGB_norm);
    var s = saturation(myRGB_norm);
    var l = lightness(myRGB_norm);

    var myHSL = new HSL_obj(h, s, l);
    return myHSL;
}

/**
 * This function alters the sound based on the hsl color input
 * @param h The hue of the input color, corresponds to frequency
 * @param s The saturation of the input color, corresponds to attack speed
 * @param l The lightness of the input color, corresponds to volume
 * @param sound The sound object to be altered
 */
function hslToSound(myHSL, sound) {
    sound.frequency = (myHSL.h/360)*4158.51 + 27.5;
    sound.attack = myHSL.s*2;
    sound.volume = myHSL.l;
}