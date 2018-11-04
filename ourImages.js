var isConverted = false;
var isFileOpened = false;

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