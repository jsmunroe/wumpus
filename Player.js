class Player {
    constructor() {
        this.x = 0;
        this.y = 0;

        this.map = null;

        this.side = Side.left;

        this.isDead = false;
    }

    draw(ctx, timeStamp) {
        if (timeStamp % 1000 > 700 || this.isDead) {
            return;
        }

        if (this.side == Side.left) {
            ctx.drawImage(Sprite.player, (this.x + 0.1) * Config.tileWidth, this.y * Config.tileHeight);
        } else {
            ctx.drawImage(Sprite.player, (this.x + 0.4) * Config.tileWidth, this.y * Config.tileHeight);
        }
    }

    moveNorth() {
        var current = this.map.getTile(this.x, this.y);
        var next = this.map.getTileToNorth(this);

        if (current instanceof HallEastToNorth && this.side == Side.left ||
            current instanceof HallEastToSouth && this.side == Side.right) {
            Sound.block.play();
            return;
        }

        this.side = (next instanceof HallEastToSouth) ? Side.right : Side.left;

        if (this.map.movePlayerToTile(this, next)) {
            Sound.move.play();
        }
    }

    moveSouth() {
        var current = this.map.getTile(this.x, this.y);
        var next = this.map.getTileToSouth(this);

        if (current instanceof HallEastToNorth && this.side == Side.right ||
            current instanceof HallEastToSouth && this.side == Side.left) {
            Sound.block.play();
            return;
        }

        this.side = (next instanceof HallEastToNorth) ? Side.right : Side.left;

        if (this.map.movePlayerToTile(this, next)) {
            Sound.move.play();
        }
    }

    moveEast() {
        var current = this.map.getTile(this.x, this.y);
        var next = this.map.getTileToEast(this);

        if (current instanceof Hall && this.side == Side.left) {
            Sound.block.play();
            return;
        }

        this.side = Side.left;

        if (this.map.movePlayerToTile(this, next)) {
            Sound.move.play();
        }
    }

    moveWest() {
        var current = this.map.getTile(this.x, this.y);
        var next = this.map.getTileToWest(this);

        if (current instanceof Hall && this.side == Side.right) {
            Sound.block.play();
            return;
        }

        this.side = (next instanceof Hall) ? Side.right : Side.left;

        if (this.map.movePlayerToTile(this, next)) {
            Sound.move.play();
        }
    }

}