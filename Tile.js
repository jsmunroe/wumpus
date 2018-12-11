class Tile {
    constructor() {
        this.x = 0;
        this.y = 0;

        this.isExplored = false;
    
        this.map = null;
    }

    draw(ctx, timeStamp) { }

    drawSprite(ctx, sprite) {
        ctx.drawImage(sprite, this.x * Config.tileWidth, this.y * Config.tileHeight);
    }

    canBeFirst() {
        return false;
    }

    getNorth() {
        return this.map.getTileToNorth(this);
    }

    getSouth() {
        return this.map.getTileToSouth(this);
    }

    getEast() {
        return this.map.getTileToEast(this);
    }

    getWest() {
        return this.map.getTileToWest(this);
    }

    reveal() {
        this.isExplored = true;
    }
}

class Room extends Tile {
    constructor() {
        super();

        this.hasBlood = false;
        this.hasSlime = false;
        this.hasBat = false;
    }

    draw(ctx, timeStamp) {
        if (!this.isExplored) {
            return;
        }

        if (this.hasSlime) {
            this.drawSprite(ctx, Sprite.slimyRoom);

        } else {
            this.drawSprite(ctx, Sprite.room);
        }

        this.hasBlood && this.drawSprite(ctx, Sprite.blood);
        this.hasBat && this.drawSprite(ctx, Sprite.bat)
    }

    canBeFirst() {
        if (this.isDeadly) {
            return false;
        }

        if (this.hasBlood) {
            return false;
        }

        if (this.hasSlime) {
            return false;
        }

        if (this.hasBat) {
            return false;
        }

        return true;
    }
}

class Hall extends Tile {
    constructor() {
        super();

        this.isLeftExplored = false;
        this.isRightExplored = false;

        this.leftSprite = null;
        this.rightSprite = null;
    }

    draw(ctx, timeStamp) {
        this.leftSprite && this.isLeftExplored && this.drawSprite(ctx, this.leftSprite);
        this.rightSprite && this.isRightExplored && this.drawSprite(ctx, this.rightSprite);
    }

    reveal() {
        this.isLeftExplored = true;
        this.isRightExplored = true;
    }
}

class HallEastToSouth extends Hall {
    constructor() {
        super();

        this.rightSprite = Sprite.roomSE;
        this.leftSprite = Sprite.roomNW;  
    }
}

class HallEastToNorth extends Hall {
    constructor() {
        super();

        this.rightSprite = Sprite.roomNE;
        this.leftSprite = Sprite.roomSW;        
    }
}

class Pit extends Room {
    constructor() {
        super();

        this.isDeadly = true;
        this.leftSprite = Sprite.pit;
    }

    draw(ctx, timeStamp) {
        if (!this.isExplored) {
            return;
        }
        
        this.drawSprite(ctx, Sprite.pit)
    }
}

class Lair extends Room {
    constructor() {
        super();

        this.isDeadly = true;
        this.leftSprite = Sprite.room;
        this.rightSprite = Sprite.wumpus;
    }

    draw(ctx, timeStamp) {
        if (!this.isExplored) {
            return;
        }
        
        this.drawSprite(ctx, Sprite.room);
        this.drawSprite(ctx, Sprite.wumpus);
    }

}
