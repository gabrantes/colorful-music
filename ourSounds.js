//var freq = 261.6; // middle C
var freq = 440; //A4
var ratio = 1.05946; //Equal temperament tuning ratio

var mySound = new Pizzicato.Sound({
    source: 'wave',
    options: {
        type:  'triangle',
        frequency: freq,
        release: 0.2
    }
});

/**
 * This function transposes a sound UP by a minor third
 *
 * @param sound The sound object to be transposed
 */
function incrementSound(sound) {
    sound.frequency *= (6/5);
}

/**
 * This function transposes a sound DOWN by a minor third
 *
 * @param sound The sound object to be transposed
 */
function decrementSound(sound) {
    sound.frequency *= (5/6);
}

/**
 * This function stops a sound, and resets it to the original frequency
 *
 * @param sound The sound object to be stopped
 */
function stopSound(sound) {
    sound.stop();
    sound.frequency = freq; // resets to original frequency
}

var effect = new Pizzicato.Effects.Flanger({
    time: 0.45,
    speed: 0.2,
    depth: 0.1,
    feedback: 0.1,
    mix: 0.5
});
mySound.addEffect(effect);

/**
 * This function calculates a logarithm
 * @param base
 * @param arg
 * @returns {number}
 */
function logx(base, arg) {
    return Math.log(arg)/Math.log(base);
}
/**
 * This function alters the sound based on the hsl color input
 *
 * @param myHSL An array containing hue, saturation, lightness respectively.
 *              Each of these values must range from 0 to 1
 * @param sound The sound object to be altered
 */
function hslToSound(myHSL, sound) {
    console.log("Hue: ", myHSL[0]);
    console.log("Saturation: ", myHSL[1]);
    console.log("Lightness: ", myHSL[2]);

    // modifying the frequency using saturation
    var pitch = freq * ratio ** Math.floor(((myHSL[0])*40) / 1);
    var dichord = Math.floor((logx(ratio, pitch/freq) + 12)% 12);
    console.log("dichord: " + dichord);
    if (dichord == 1 || dichord == 3 || dichord == 6 || dichord == 8 || dichord == 10) {
        sound.frequency = pitch * ratio;

    }
    else {

        sound.frequency = pitch;
    }

    // modifying the effects using lightness
    var minEffect = 0.2;
    effect.feedback = (1 - myHSL[2]) + minEffect;
    effect.speed = (1 - myHSL[2]) + minEffect;
    effect.depth = (1 - myHSL[2] + minEffect) / 4;
    // sound.volume = myHSL[2];
}


