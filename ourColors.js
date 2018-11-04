function makeGradients(ctx) {
    console.log("making gradients");
    
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

function drawMonaLisa(ctx) {
    console.log('drawing the mona');
    var mona = new Image();
    mona.src = "https://tse4.mm.bing.net/th?id=OIP.PtGNX5NmBFu3XUVGSQywZwHaK9&pid=Api&w=730&h=1080&rs=1&p=0";
    mona.crossOrigin = 'Anonymous';
    mona.onload = function() {
        ctx.drawImage(mona, 0, 0);
    }
}


function main() {
    
    var canvas = document.getElementById("canvas");
    canvas.width = screen.width;
    canvas.height = screen.height;
    var ctx = canvas.getContext('2d');

    // drawMonaLisa(ctx);
    makeGradients(ctx);
    canvas.addEventListener("touchstart",function(event){
        mySound.play();
        whenMovesTouch.call(this, event);
        canvas.addEventListener("touchmove", whenMovesTouch,false);
    });
    canvas.addEventListener("touchend", function() {
        mySound.stop();
        this.removeEventListener("touchmove", whenMovesTouch);
    });
    canvas.addEventListener("mousedown",function(event){
        mySound.play();
        whenMovesMouse.call(this, event);
        canvas.addEventListener("mousemove", whenMovesMouse,false);
    });
    canvas.addEventListener("mouseup", function() {
        mySound.stop();
        this.removeEventListener("mousemove", whenMovesMouse);
    });
}

function whenMovesMouse(event) {
    // Get the coordinates of the click
    var eventLocation = getEventLocation(this,event);
    // Get the data of the pixel according to the location generate by the getEventLocation function
     
    console.log(eventLocation);
    
    var context = this.getContext('2d');
    var pixelData = context.getImageData(eventLocation.x, eventLocation.y, 1, 1).data; 
    console.log(pixelData);

    // GABRIEL'S STUFF
    var color = new Color(pixelData[0], pixelData[1], pixelData[2]);
    var hsl = color.toHSL();

    hslToSound(hsl, mySound);

    // If transparency on the pixel , array = [0,0,0,0]
    if((pixelData[0] == 0) && (pixelData[1] == 0) && (pixelData[2] == 0) && (pixelData[3] == 0)){
        console.log('whu');
        // Do something if the pixel is transparent
    }

    // Convert it to HEX if you want using the rgbToHex method.
    // var hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
}

function whenMovesTouch(event) {
    // Get the coordinates of the click
    var xCoordinate = event.touches[0].clientX;
    var yCoordinate = event.touches[0].clientY;

    // Get the data of the pixel according to the location generate by the getEventLocation function

    console.log("x: " + xCoordinate, "y: " + yCoordinate);

    var context = this.getContext('2d');
    var pixelData = context.getImageData(xCoordinate, yCoordinate, 1, 1).data;
    console.log(pixelData);

    // GABRIEL'S STUFF
    var color = new Color(pixelData[0], pixelData[1], pixelData[2]);
    var hsl = color.toHSL();

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
