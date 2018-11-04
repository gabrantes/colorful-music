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

var sound3 = new Pizzicato.Sound({
    source: 'wave',
    options: {
        type:  'triangle',
        frequency: freq,
        release: 0.2
    }
});

/**
 *  Opens a file and saves the element into a variable called output
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
 */
function convertFromPalette(palette, sound) {
  var color = new Color(palette[0], palette[1], palette[2]);
  var hsl = color.toHSL();
  hslToSound(hsl, sound);
}

/**
 * Converts an image file into a palette of its three most dominant colors
 * Notice it is returning in RGB format, NOT HSL.
 *
 * @return An array of the three colors, in RGB format: [ {r, g, b}, {r, g, b}, {r, g, b} ]
 */
function paletteImg(src) {
  var colorThief = new ColorThief();
  var palette = colorThief.getPalette(src, 3);
  console.log("palette created");
  return palette;
}

/**
 * Converts an image file into three sounds
 */
function convert(src) {
  if (isFileOpened) {
    console.log("converting...");
    isConverted = true;
    var palette = paletteImg(src); // palette is an array of 3 RGB colors

    // modifying our three sounds using the 3 RGB colors in the palette array
    convertFromPalette(palette[0], sound1);
    convertFromPalette(palette[1], sound2);
    convertFromPalette(palette[2], sound3);

    return palette;
  }
  return null;
}

/**
 * Plays our three sounds
 */
function playAll() {
  if (isConverted && isFileOpened) {
    sound1.play();
    sound2.play();
    sound3.play();
  }
}

/**
 * Stops our three sounds
 */
function stopAll() {
  sound1.stop();
  sound2.stop();
  sound3.stop();
}

function display(palette) {
  console.log("palette[0] = ", palette[0]);
  console.log("palette[1] = ", palette[1]);
  console.log("palette[2] = " , palette[2]);
}

function toggle_div_fun(id, rgb) {
  console.log("toggle_div_fun");

  var divElement = document.getElementById(id);

  // changing color of the div
  var randR = rgb[0];
  var randG = rgb[1];
  var randB = rgb[2];
  divElement.appendChild(document.createTextNode(" "));
  divElement.style.backgroundColor = "rgb(" + randR + ", " + randG + ", " + randB + ")";
}