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
    static load(path) {
        var image = new Image(80, 80);
        image.src = path;
    
        return image;
    }
}

Sprite.room = Sprite.load('./images/room.png');
Sprite.roomNE = Sprite.load('./images/room.ne.png');
Sprite.roomNW = Sprite.load('./images/room.nw.png');
Sprite.roomSE = Sprite.load('./images/room.se.png');
Sprite.roomSW = Sprite.load('./images/room.sw.png');
Sprite.pit = Sprite.load('./images/pit.png');
Sprite.wumpus = Sprite.load('./images/wumpus.png');
Sprite.blood = Sprite.load('./images/blood.png');
Sprite.bat = Sprite.load('./images/bat.png');
Sprite.slimyRoom = Sprite.load('./images/room.slimy.png');
Sprite.player = Sprite.load('./images/player.png');
Sprite.playerAim = Sprite.load('./images/player.aim.png');


class Sound {
    constructor(audio) {
        this._audio = audio;
    }

    play() {
        if (Sound.lastPlay) {
            Sound.lastPlay.pause();
            Sound.lastPlay.currentTime = 0.0;
        }

        this._audio.play();
        Sound.lastPlay = this._audio;
    }

    static load(path) {
        var audio = new Audio(path);
        return new Sound(audio);
    }
}

Sound.move = Sound.load('./sounds/move.mp3');
Sound.block = Sound.load('./sounds/block.mp3');

