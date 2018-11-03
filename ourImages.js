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

var openFile = function(file) {
  var input = file.target;

  var reader = new FileReader();
  reader.onload = function(){
    var dataURL = reader.result;
    var output = document.getElementById('output');
    output.src = dataURL;
  };
  reader.readAsDataURL(input.files[0]);
};

function hslFromPalette(palette, sound) {
  var color = Color.rgb(palette[0], palette[1], palette[2]);
  var hsl = color.hslData();
  hslToSound(hsl, sound);
}

function convert(src) {
  var palette = paletteImg(src);
  hslFromPalette(palette[0], sound1);
  hslFromPalette(palette[1], sound2);
  hslFromPalette(palette[2], sound3);
}

function paletteImg(src) {
  var colorThief = new ColorThief();
  var palette = colorThief.getPalette(src, 3);
  console.log("palette created");
  return palette;
}

function playAll() {
  sound1.play();
  sound2.play();
  sound3.play();
}

function stopAll() {
  sound1.stop();
  sound2.stop();
  sound3.stop();
}