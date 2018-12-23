gridContext.fillStyle = BLACK;
gridContext.fillRect(0, 0, gridDom.width, gridDom.height);

function clear() {
    for (var y = 0; y < grid.height; ++y) {
        for (var x = 0; x < grid.width; ++x) {
            drawAt(x, y, WHITE, gridContext);
        }
    }
}

clear();

function updateHealthBar() {
    var innerWidth = healthBar.width - tile.spacing * 2;
    var innerHeight = healthBar.height - tile.spacing * 2;

    healthBarContext.fillStyle = BLACK;
    healthBarContext.fillRect(0, 0, healthBar.width, healthBar.height);

    healthBarContext.fillStyle = WHITE;
    healthBarContext.fillRect(tile.spacing, tile.spacing, innerWidth, innerHeight);

    healthBarContext.fillStyle = BLUE;
    healthBarContext.fillRect(tile.spacing, tile.spacing, innerWidth * player.health / 10, innerHeight);
}

function reset() {
    Game = {
        started: false,
        
        score: 0,
        maxEnemy: Math.max(grid.width, grid.height),
        enemies: [new Enemy(grid.width, grid.height)],
        spawnChance: Math.min(grid.width, grid.height),

        turn: 0,
        turnDelay: 30
    };

    player = {
        health: maxHealth,
        colour: BLUE,
        position: {
            x: 5,
            y: 5
        }
    };
}

function lose() {
    Game.started = false;
    fadeIn(restartButton, closeButton, 'block');
    fadeOut(touchDom, healthBar);
}

function enemyTurn() {
    return Game.turn % Game.turnDelay == 0;
}

function start() {
    Game.started = true;
    var main = setInterval(() => { 
        Game.turn++;

        player.colour = BLUE;
        clear();

        var enemyMove = enemyTurn();
        
        Game.enemies.forEach((enemy) => {
            enemy.render(drawAt, gridContext);
            if (enemyMove) { 
                enemy.move(); 
                if (enemy.reached()) {
                    enemy.init(grid.width, grid.height);
                }
            }
            if (enemy.intersect(player.position)) {
                player.colour = YELLOW;
                if (enemyMove) {
                    player.health--;
                    updateHealthBar();
                    if (player.health == 0) {
                        lose();
                        clearInterval(main);
                    }
                }
            }
        });

        renderPlayer();

        if (enemyMove) { 
            if (Game.enemies.length < Game.maxEnemy && Math.floor(Math.random() * 100) < Game.spawnChance) {
                Game.enemies.push(new Enemy(grid.width, grid.height));
            }
            
            scoreLabel.textContent = ++Game.score;
        }
    }, 5);
}