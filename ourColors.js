var effect;
function makeGradients() {
    console.log("making gradients");
    var theCanvas = document.getElementById('canvas');
    theCanvas.width = screen.width;
    theCanvas.height = screen.height;
    
    var ctx = theCanvas.getContext('2d');
    
    var grd = ctx.createLinearGradient(0, 0, screen.width, 0);
    
    // gradient is in roygbiv backwards order
    grd.addColorStop(0, '#e400D3');
    grd.addColorStop(1/7, '#4B0082');
    grd.addColorStop(2/7, '#0000FF');
    grd.addColorStop(3/7, '#00FF00');
    grd.addColorStop(4/7, '#FFFF00');
    grd.addColorStop(5/7, '#FF7F00');
    grd.addColorStop(6/7, '#FF0000');
    grd.addColorStop(1, '#FF0000');
    
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, screen.width, screen.height);


    // Adding saturation of a sort
    var sat = ctx.createLinearGradient(0, 0, 0, screen.height);
    sat.addColorStop(0, 'rgba(255, 255, 255, 0)');
    sat.addColorStop(1, 'rgba(255, 255, 255, 1)');
    ctx.fillStyle = sat;
    ctx.fillRect(0, 0, screen.width, screen.height);
}

function main() {
    makeGradients();
    
    var canvas = document.getElementById("canvas");

    var context = canvas.getContext('2d');
    
    canvas.addEventListener("mousedown",function(event){
        mySound.play();
        whenMoves.call(this, event);
        canvas.addEventListener("mousemove", whenMoves,false);
    });
    canvas.addEventListener("mouseup", function() {
        mySound.stop();
        // mySound.removeEffect(effect);
        this.removeEventListener("mousemove", whenMoves);
    });
}

function whenMoves(event) {
    // Get the coordinates of the click
    var eventLocation = getEventLocation(this,event);
    // Get the data of the pixel according to the location generate by the getEventLocation function
     
    console.log(eventLocation);
    
    var context = this.getContext('2d');
    var pixelData = context.getImageData(eventLocation.x, eventLocation.y, 1, 1).data; 
    console.log(pixelData);

    // GABRIEL'S STUFF
    var color = Color.rgb(pixelData[0], pixelData[1], pixelData[2]);
    var hsl = color.hslData();
    // effect = new Pizzicato.Effects.Tremolo({
    //     speed:0,
    //     depth, 1,
    //     mix, 0.8
    // });
    // mySound.addEffect(effect);
    hslToSound(hsl, mySound);

    // If transparency on the pixel , array = [0,0,0,0]
    if((pixelData[0] == 0) && (pixelData[1] == 0) && (pixelData[2] == 0) && (pixelData[3] == 0)){
        console.log('whu');
        // Do something if the pixel is transparent
    }

    // Convert it to HEX if you want using the rgbToHex method.
    // var hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
}

window.onload = main;
