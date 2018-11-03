
function makeGradients() {
    var theCanvas = document.getElementById('canvas');
    console.log("making gradients");
    var ctx = canvas.getContext('2d');
    var grd = ctx.createLinearGradient(0, window.innerHeight, 0, 0);
    // gradient is in roygbiv backwards order
    grd.addColorStop(0, '#9400D3');
    grd.addColorStop(1/7, '#4B0082');
    grd.addColorStop(2/7, '#0000FF');
    grd.addColorStop(3/7, '#00FF00');
    grd.addColorStop(4/7, '#FFFF00');
    grd.addColorStop(5/7, '#FF7F00');
    grd.addColorStop(6/7, '#FF0000');

    ctx.fillStyle = grd;
    ctx.fillRect(0, window.innerWidth, 0, window.innerHeight);
}

window.onload = makeGradients;
