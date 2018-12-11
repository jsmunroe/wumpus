
var map = new Map();

function draw(timeStamp) {
    requestAnimationFrame(draw); // request next frame

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext("2d");

    map.draw(ctx, timeStamp);
}

$(function(ex) {
    draw();

    document.addEventListener('keydown', event => {
        console.log(event.which);

        if (event.which == 37)  { // Right
            map.player.moveWest();
        } else if (event.which == 38) { // Up
            map.player.moveNorth();
        } else if (event.which == 39) { // Left 
            map.player.moveEast();
        } else if (event.which == 40) { // Down
            map.player.moveSouth();
        } else if (event.which == 81) { // q
            map.player.takeAim();
        }
    })
})