class Map {
    constructor() {
        this.build();
    }

    build() {
        this.width = 8;
        this.height = 6;
        this._tiles = [];

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                var tile = this.getRandomTile();
                this.setTile(x, y, tile);
            }
        }

        // Place player
        var room = Randomizer.getRandom(this._tiles.filter(i => i instanceof Room || i instanceof Hall));

        this.player = new Player();
        this.player.map = this;

        this.movePlayerToTile(this.player, room);
        
        if (room instanceof Hall) {
            this.player.side = Randomizer.nextInt(1);
        }

        // Pick pits
        for (var i = 0; i < Config.pitsInMap; i++) {
            var room = Randomizer.getRandom(this._tiles.filter(i => i instanceof Room || i instanceof Hall));

            this.setPit(room.x, room.y)
        }

        // Pick wumpus lair
        for (var i = 0; i < Config.lairsInMap; i++) {
            var room = Randomizer.getRandom(this._tiles.filter(i => i instanceof Room || i instanceof Hall));

            this.setLair(room.x, room.y)
        }
    }

    setTile(x, y, tile) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            throw new Error(`Coordinates (${x}, ${y}) are out of bounds.`);
        }

        tile.x = x;
        tile.y = y;

        this._tiles[y * this.width + x] = tile;
    }

    getTile(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            throw new Error(`Coordinates (${x}, ${y}) are out of bounds.`);
        }

        return this._tiles[y * this.width + x];
    }

    setPit(x, y) {
        var pit = new Pit();
        this.setTile(x, y, pit);

        this.getSurroundingRooms(pit, 1, room => room.hasSlime = true);
    }

    setLair(x, y) {
        var lair = new Lair();
        this.setTile(x, y, lair);

        this.getSurroundingRooms(lair, 2, room => room.hasBlood = true);
    }

    getSurroundingRooms(me, depth, callback) {
        var metaCallback = room => {
            callback(room);
            if (depth > 1) {
                this.getSurroundingRooms(room, depth - 1, callback)
            }
        }
        
        this.getRoomToNorth(me, metaCallback);
        this.getRoomToSouth(me, metaCallback);
        this.getRoomToEast(me, metaCallback);
        this.getRoomToWest(me, metaCallback);                
    }

    getTileToNorth(me) {
        var x = me.x;
        var y = this.normalizeY(me.y - 1);

        return this.getTile(x, y);
    }

    getTileToSouth(me) {
        var x = me.x;
        var y = this.normalizeY(me.y + 1);

        return this.getTile(x, y);
    }

    getTileToEast(me) {
        var x = this.normalizeX(me.x + 1);
        var y = me.y;

        return this.getTile(x, y);
    }

    getTileToWest(me) {
        var x = this.normalizeX(me.x - 1);
        var y = me.y;

        return this.getTile(x, y);
    }

    getRoomToNorth(me, callback) {
        var tile = this.getTileToNorth(me);

        if (tile instanceof Room) {
            callback && callback(tile);
            return tile;

        } else if (tile instanceof HallEastToSouth) {
            var room = this.getRoomToEast(tile)
            callback && callback(room);
            return room;

        } else if (tile instanceof HallEastToNorth) {
            var room = this.getRoomToWest(tile);
            callback && callback(room);
            return room;
        }

        return undefined;
    }

    getRoomToSouth(me, callback) {
        var tile = this.getTileToSouth(me);

        if (tile instanceof Room) {
            callback && callback(tile);
            return tile;

        } else if (tile instanceof HallEastToSouth) {
            var room = this.getRoomToWest(tile)
            callback && callback(room);
            return room;

        } else if (tile instanceof HallEastToNorth) {
            var room = this.getRoomToEast(tile);
            callback && callback(room);
            return room;
        }

        return undefined;
    }

    getRoomToEast(me, callback) {
        var tile = this.getTileToEast(me);

        if (tile instanceof Room) {
            callback && callback(tile);
            return tile;

        } else if (tile instanceof HallEastToSouth) {
            var room = this.getRoomToNorth(tile)
            callback && callback(room);
            return room;

        } else if (tile instanceof HallEastToNorth) {
            var room = this.getRoomToSouth(tile);
            callback && callback(room);
            return room;
        }

        return undefined;
    }

    getRoomToWest(me, callback) {
        var tile = this.getTileToWest(me);

        if (tile instanceof Room) {
            callback && callback(tile);
            return tile;

        } else if (tile instanceof HallEastToSouth) {
            var room = this.getRoomToSouth(tile)
            callback &&  callback(room);
            return room;

        } else if (tile instanceof HallEastToNorth) {
            var room = this.getRoomToNorth(tile);
            callback && callback(room);
            return room;
        }

        return undefined;
    }

    normalizeX(x) {
        x = x % this.width;
        return (x >= 0) ? x : x + this.width;
    }

    normalizeY(y) {
        y = y % this.height;
        return (y >= 0) ? y : y + this.height;
    }

    draw(ctx, timeStamp) {
        ctx.clearRect(0, 0, this.width * Config.tileWidth, this.height * Config.tileHeight);
        for (var i = 0; i < this._tiles.length; i++) {
            this._tiles[i].draw(ctx, timeStamp);
        }

        this.player.draw(ctx, timeStamp);
    }

    movePlayerToTile(player, tile) {
        player.x = tile.x;
        player.y = tile.y;

        tile.isExplored = true;

        if (tile instanceof Hall) {
            if (player.side == Side.left) {
                tile.isLeftExplored = true;
            } else if (player.side == Side.right) {
                tile.isRightExplored = true;
            }
        }

        if (tile instanceof Pit) {
            setTimeout(() => {
                alert('You fell into a pit.\n\nToo bad!');
                this.build();
            }, 50);
            player.isDead = true;
            return false;
        }

        if (tile instanceof Lair) {
            setTimeout(() => {
                alert('The wumpus got you.\n\nBe more careful next time!')
                this.build();
            }, 50);
            player.isDead = true;
            return false;
        }

        return true;
    }

    getRandomTile() {
        let tileFactories = [
            () => new Room(),
            () => new HallEastToNorth(),
            () => new HallEastToSouth()
        ];

        let weights = [
            15,
            1,
            1
        ];

        return Randomizer.getRandom(tileFactories, weights)();
    }
}