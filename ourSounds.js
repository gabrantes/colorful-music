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
 * This function alters the sound based on the hsl color input
 * @param h The hue of the input color, corresponds to frequency
 * @param s The saturation of the input color, corresponds to attack speed
 * @param l The lightness of the input color, corresponds to volume
 * @param sound The sound object to be altered
 */
function hslToSound(h, s, l, sound) {
    sound.frequency = (h/360)*4158.51 + 27.5;
    sound.attack = s*2;
    sound.volume = l;
}