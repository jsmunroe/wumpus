var Direction = {
    north: 0,
    east: 1,
    south: 2,
    west: 3
}

var Side = {
    left: 0,
    right: 1
}

var Config = {
    tileWidth: 80,
    tileHeight: 80,
    pitsInMap: 2,
    lairsInMap: 1
}

class Sprite { 
    static loadImage(path) {
        var image = new Image(80, 80);
        image.src = path;
    
        return image;
    }
}

Sprite.room = Sprite.loadImage('./images/room.png');
Sprite.roomNE = Sprite.loadImage('./images/room.ne.png');
Sprite.roomNW = Sprite.loadImage('./images/room.nw.png');
Sprite.roomSE = Sprite.loadImage('./images/room.se.png');
Sprite.roomSW = Sprite.loadImage('./images/room.sw.png');
Sprite.pit = Sprite.loadImage('./images/pit.png');
Sprite.wumpus = Sprite.loadImage('./images/wumpus.png');
Sprite.blood = Sprite.loadImage('./images/blood.png');
Sprite.bat = Sprite.loadImage('./images/bat.png');
Sprite.slimyRoom = Sprite.loadImage('./images/room.slimy.png');
Sprite.player = Sprite.loadImage('./images/player.png');

var Sound = {
    move: document.getElementById('audio-move'),
    block: document.getElementById('audio-block'),
 };

