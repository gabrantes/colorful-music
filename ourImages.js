var isConverted = false;
var isFileOpened = false;

var zeroDichord = [4, 5, 7, 9]; //Set of arrays containing possible dichord numbers for sound2 based on the dichord numbers of sound1
var twoDichord = [5, 7, 9, 11];
var fourDichord = [7, 9, 11];
var fiveDichord = [9, 0, 11];
var sevenDichord = [11, 0, 2, 4];
var nineDichord = [0, 2, 4, 5, 7];
var elevenDichord = [2, 4, 7];

var sound1 = new Pizzicato.Sound({ //declare sound1
    source: 'wave',
    options: {
        type:  'triangle',
        frequency: freq,
        release: 0.2
    }
});

var sound2 = new Pizzicato.Sound({ //declare sound2
    source: 'wave',
    options: {
        type:  'triangle',
        frequency: freq,
        release: 0.2
    }
});

var sound3 = new Pizzicato.Sound({ //declare sound3
    source: 'wave',
    options: {
      type: 'triangle',
      frequency: freq,
      release: 0.2
    }
});

/**
 * Converts a dichord to a frequency in just intonation
 *
 * @param dichord
 * @return The frequency equivalent of the given dichord
 */
function dichordToFreq(dichord) {
    if (dichord == 2) {
        return 440 * 9/8;
    }
    else if (dichord == 4) {
        return 440 * 5/4;
    }
    else if (dichord == 5) {
        return 440 * 4/3;
    }
    else if (dichord == 7) {
        return 440 * 3/2;
    }
    else if (dichord == 9) {
        return 440 * 5/3;
    }
    else if (dichord == 11) {
        return 440 * 15/8;
    }
}


var soundArray = [];

function setDichords(a, b) { //set dichords for 2nd and 3rd sounds based on dichord values of 1st and 2nd sounds
        var tmp = a;
        sound3.dichord = b;
        console.log("in setDichords(), sound3.dichord = ", sound3.dichord);
}

/**
 * This function alters the sound based on the hsl color input, ensuring that
 * all sounds are harmonically acceptable.
 *
 * @param myHSL An array containing hue, saturation, lightness respectively. [hue, saturation, lightness]
 *              Each of these values must range from 0 to 1
 * @param soundArr The array of the two (diatonic) sounds after they've been passed through the function
 *                 hslToSound, of format [sound1 , sound2]
 */
function hslToSound_harmonic(soundArr) {
    // find the bass (the min)
    if (soundArr[0].dichord > soundArr[1].dichord) {
        console.log("swapping soundArr[0] (", soundArr[0].dichord, ") and soundArr[1] (", soundArr[1].dichord, ")");
        var tmp = soundArr[0];
        soundArr[0] = soundArr[1];
        soundArr[1] = tmp;
        console.log("finished swapping. soundArr[0] (", soundArr[0].dichord, ") and soundArr[1] (", soundArr[1].dichord, ")");
    } // now array is in order

    // determine the 3rd note
    switch(soundArr[0].dichord) {
        case 0:
          console.log("case 0");
          switch(findNearestVal(soundArr[1].dichord, zeroDichord, zeroDichord.length)){
              case 4: console.log("case 0, 4"); setDichords(4, 7); break;
              case 5: console.log("case 0, 5"); setDichords(5, 8); break;
              case 7: console.log("case 0, 7"); setDichords(7, 4); break;
              case 9: console.log("case 0, 9"); setDichords(9, 5); break;
              default: console.log("case 0, default"); break;
          }
          break;
        case 2:      
          console.log("case 2");    
          switch(findNearestVal(soundArr[1].dichord, twoDichord, twoDichord.length)) {
              case 5: console.log("case 2, 5"); setDichords(5, 9); break;
              case 7: console.log("case 2, 7"); setDichords(7, 11); break;
              case 9: console.log("case 2, 9"); setDichords(9, 5); break;
              case 11: console.log("case 2, 11"); setDichords(11, 7); break;
              default: console.log("case 2, defualt"); break;
          }
          break;
        case 4:
          console.log("case 4");
          switch(findNearestVal(soundArr[1].dichord, fourDichord, fourDichord.length)) {
              case 7:
                  console.log("case 4, 7");
                  setDichords(7, 0);
                  break;
              case 9:
                  console.log("case 4, 9");
                  setDichords(9, 0);
                  break;
              case 11:
                  console.log("case 4, 11");
                  setDichords(11, 7);
                  break;
          }
          break;
        case 5:
          console.log("case 5");           
          switch(findNearestVal(soundArr[1].dichord, fiveDichord, fiveDichord.length)) {
              case 9:
                  console.log("case 5, 9");
                  setDichords(9, 0);
                  break;
              case 0:
                  console.log("case 5, 0");
                  setDichords(0, 9);
                  break;
          }
          break;
        case 7:
          console.log("case 7");          
          switch(findNearestVal(soundArr[1].dichord, sevenDichord, sevenDichord.length)) {
            case 11:
                console.log("case 7, 11");
                setDichords(11, 2);
                break;
            case 0:
                console.log("case 7, 0");
                setDichords(0, 4);
                break;
            case 2:
                console.log("case 7, 2");
                setDichords(2, 11);
                break;
            case 4:
                console.log("case 7, 4");
                setDichords(4, 0);
                break;
          }
          break;
        case 9:
          console.log("case 9");
          switch(findNearestVal(soundArr[1].dichord, nineDichord, nineDichord.length)) {
            case 0:
              console.log("case 9, 0");
              setDichords(0, 5);
              break;
            case 2:
              console.log("case 9, 2");
              setDichords(2, 5);
              break;
            case 4:
              console.log("case 9, 4");
              setDichords(4, 0);
              break;
            case 5:
              console.log("case 9, 5");
              setDichords(5, 2);
              break;
            case 7:
              console.log("case 9, 7")
              setDichords(7, 4);
              break;
          }
          break;
        case 11:
          console.log("case 11");
          switch(findNearestVal(soundArr[1].dichord, elevenDichord, elevenDichord.length)){
              case 2:
                  console.log("case 11, 2");
                  setDichords(2, 7);
                  break;
              case 4:
                  console.log("case 11, 4");
                  setDichords(4, 7);
                  break;
              case 7:
                  console.log("case 11, 7");
                  setDichords(7, 2);
                  break;
          }
          break;
        default: console.log("no cases found, default"); break;
    }

    console.log("sound3.dichord = ", sound3.dichord);
    sound3.frequency = dichordToFreq(sound3.dichord);
    soundArray.push(sound3);

    for (var i = 0; i < 3; ++i) { //remove all sound effects (used in playing with color)
      soundArray[i].removeEffect(effect);
    }

}

/**
 * Adjusts sound2 to more harmonically fit with sound1 in the context of A ionion mode
 * @param dichord
 * @param arrDichords
 * @param arrSize
 * @returns {*}
 */
function findNearestVal(dichord, arrDichords, arrSize) {
    console.log("findNearestVal(", dichord, ")");
    var diffArr = [];
    for (var i = 0; i < arrSize; ++i) {
      diffArr.push(Math.abs(dichord - arrDichords[i]));
    }

    console.log(diffArr);

    var minIndex = 0;
    var minValue = diffArr[0];
    for (var i = 0; i < arrSize; ++i) {
      if (diffArr[i] < minValue) {
        minValue = diffArr[i];
        minIndex = i;
      }
    }
    console.log("minIndex: ", minIndex);
    console.log("the nearest dichord: ",arrDichords[minIndex]);

    return arrDichords[minIndex];
    console.log("no found dichord");
    return null;
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
    
    var palette = paletteImg(src); // palette is an array of 2 RGB colors

    // modifying our two sounds using the 3 RGB colors in the palette array
    convertFromPalette(palette[0], sound1);
    convertFromPalette(palette[1], sound2);

    soundArray.push(sound1);
    console.log("pushed sound1");
    soundArray.push(sound2);
    console.log("pushed sound2");

    // add the third sound
    hslToSound_harmonic(soundArray);
    isConverted = true;
    console.log("converted successfully.");
    return palette;
  }
  return null;
}

/**
 * Plays our soundArray
 */
function playAll() {
  if (isConverted && isFileOpened) {
    console.log("playAll()");
    for (var i = 0; i < 3; ++i) {
      soundArray[i].play((i/2) + 0.5);
      console.log(soundArray[i].dichord);
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
