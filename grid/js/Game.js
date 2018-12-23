var Game = {
    started: false,

    score: 0,
    maxEnemy: Math.max(grid.width, grid.height),
    enemies: [new Enemy(grid.width, grid.height)],
    spawnChance: 50,

    turn: 0,
    turnDelay: 30
};

var player = {
    health: 0,
    colour: BLUE,
    position: {
        x: 5,
        y: 5
    }
};

var touchOrigin = {
    x: 0,
    y: 0
};

var mouseDown = false;

function drawAt(x, y, fill, context) {
    context.fillStyle = fill;
    context.fillRect(tile.width * x + tile.spacing, tile.height * y + tile.spacing, tile.innerWidth, tile.innerHeight);
}

function renderPlayer() {
    drawAt(player.position.x, player.position.y, player.colour, gridContext);
}