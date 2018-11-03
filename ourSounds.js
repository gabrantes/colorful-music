var freq = 261.6; // middle C

var mySound = new Pizzicato.Sound({
    source: 'wave',
    options: {
        type:  'triangle',
        frequency: freq,
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
 * This function alters the sound based on the hsl color input
 * @param myHSL An array containing hue, saturation, lightness respectively
 * @param sound The sound object to be altered
 */
function hslToSound(myHSL, sound) {
    sound.frequency = freq + (freq * myHSL[0]);    
    effect.feedback = myHSL[1];
    effect.speed = myHSL[1];
    effect.depth = myHSL[1] / 4;
    console.log("effect.feedback = ", effect.feedback);
    // sound.volume = myHSL[2];
}
