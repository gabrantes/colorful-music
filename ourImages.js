var isConverted = false;
var isFileOpened = false;

var zeroDichord = [4, 5, 7, 9];
var twoDichord = [5, 7, 9, 11];
var fourDichord = [7, 9, 11];
var fiveDichord = [9, 0, 11];
var sevenDichord = [11, 0, 2, 4];
var nineDichord = [0, 2, 4, 5, 7];
var elevenDichord = [2, 4, 7];

var sound1 = new Pizzicato.Sound({
    source: 'wave',
    options: {
        type:  'triangle',
        frequency: freq,
        release: 0.2
    }
});

var sound2 = new Pizzicato.Sound({
    source: 'wave',
    options: {
        type:  'triangle',
        frequency: freq,
        release: 0.2
    }
});

var soundArray = [sound1, sound2];
/**
 * This function alters the sound based on the hsl color input, ensuring that
 * all sounds are harmonically acceptable.
 *
 * @param myHSL An array containing hue, saturation, lightness respectively. [hue, saturation, lightness]
 *              Each of these values must range from 0 to 1
 * @param soundArr The array of the two (diatonic) sounds after they've been passed through the function
 *                 hslToSound, of format [sound1 , sound2]
 */
function hslToSound_harmonic(myHSL, soundArr) {
    console.log("Hue: ", myHSL[0]);
    console.log("Saturation: ", myHSL[1]);
    console.log("Lightness: ", myHSL[2]);

    // find the bass (the min)
    if (soundArr[0].frequency > soundArr[1].frequency) {
        var tmp = soundArr[0];
        soundArr[0] = soundArr[1];
        soundArr[1] = soundArr[0];
    } // now array is in order

    // determine the 3rd note

    switch(soundArr[0].dichord) {
        case 0:
            switch(findNearestVal(0, zeroDichord, zeroDichord.length)({
                case 4:
                soundArr[1] = 4;

    })


}

}

function findNearestVal(dichord, arrDichords, arrSize) {
    for (var i = 0; i < arrSize; ++i) {
        if (dichord == arrDichords[i]) {
            return arrDichords[i];
        }
    }
}

/**
 * Opens a file and saves the element into a variable called output
 *
 * @param file The file we want to open
 */
var openFile = function(file) {
  var input = file.target;

  var reader = new FileReader();
  reader.onload = function(){
    var dataURL = reader.result;
    var output = document.getElementById('output');
    output.src = dataURL;
  };
  reader.readAsDataURL(input.files[0]);
  isFileOpened = true;
};

/**
 * Given an RGB palette, it modifies the sound object parameter using on our function hslToSound
 *
 * @param rgb The RGB array, of format [r, g, b]
 * @param sound The sound we want to modify using the provided palette
 */
function convertFromPalette(rgb, sound) {
  var color = new Color(rgb[0], rgb[1], rgb[2]);
  var hsl = color.toHSL();
  hslToSound(hsl, sound);
}

/**
 * Converts an image file into a palette of its three most dominant colors
 * Notice it is returning in RGB format, NOT HSL.
 *
 * @param src The image file
 * @return An array of the two colors, in RGB format: [ {r, g, b}, {r, g, b} ]
 */
function paletteImg(src) {
  var colorThief = new ColorThief();
  var palette = colorThief.getPalette(src, 2);
  console.log("palette created");
  return palette;
}

/**
 * Converts an image file into three sounds
 *
 * @param src The image file
 * @return The palette generated from the image file
 */
function convert(src) {
  if (isFileOpened) {
    console.log("converting...");
    isConverted = true;
    var palette = paletteImg(src); // palette is an array of 2 RGB colors

    // modifying our two sounds using the 3 RGB colors in the palette array
    convertFromPalette(palette[0], sound1);
    convertFromPalette(palette[1], sound2);

    // determine the third sound

    // add the third sound to the soundArray
    soundArray.push(/* the third sound */); // soundArray now contains 3 sounds

    return palette;
  }
  return null;
}

/**
 * Plays our soundArray
 */
function playAll() {
  if (isConverted && isFileOpened) {
    for (var i = 0; i < 3; ++i) {
      soundArray[i].play();
    }
  }
}

/**
 * Stops our soundArray
 */
function stopAll() {
  for (var i = 0; i < 3; ++i) {
    soundArray[i].stop();
  }
}

/**
 * Prints out the palette array to the console for debugging purposes.
 *
 * @param palette The palette array, an array of two RGB colors
 */
function display(palette) {
  console.log("palette[0] = ", palette[0]);
  console.log("palette[1] = ", palette[1]);
}

/**
 * This function takes a div element and applies a background color to it using the 
 * suplied rgb array
 *
 * @param id The id of the div element we want to modify
 * @param rgb The RGB array, of format [r, g, b]
 */
function toggle_div_fun(id, rgb) {
  console.log("toggle_div_fun");

  var divElement = document.getElementById(id);

  // changing color of the div
  var randR = rgb[0];
  var randG = rgb[1];
  var randB = rgb[2];
  divElement.appendChild(document.createTextNode(""));
  divElement.style.backgroundColor = "rgb(" + randR + ", " + randG + ", " + randB + ")";
}