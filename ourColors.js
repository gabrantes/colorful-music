
function makeGradients() {
    console.log("making gradients");
    var theCanvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    console.log(ctx);
    // var grd = ctx.createLinearGradient(0, window.innerHeight, 0, 0);
    var grd = ctx.createLinearGradient(0, 0, 0, window.innerHeight/4.5);
    
    // gradient is in roygbiv backwards order
    grd.addColorStop(0, '#e400D3');
    grd.addColorStop(1/7, '#4B0082');
    grd.addColorStop(2/7, '#0000FF');
    grd.addColorStop(3/7, '#00FF00');
    grd.addColorStop(4/7, '#FFFF00');
    grd.addColorStop(5/7, '#FF7F00');
    grd.addColorStop(6/7, '#FF0000');
    grd.addColorStop(1, '#FF0000');
    
    // grd.addColorStop(0,"black");
    // grd.addColorStop("0.3","magenta");
    // grd.addColorStop("0.5","blue");
    // grd.addColorStop("0.6","green");
    // grd.addColorStop("0.8","yellow");
    // grd.addColorStop(1,"red");

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

window.onload = makeGradients;
