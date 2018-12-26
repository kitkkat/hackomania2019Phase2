function fadeIn() {
    var display = arguments[arguments.length - 1];
    for (var i = 0; i < arguments.length - 1; ++i) {
        var dom = arguments[i];
        dom.style.display = display;
        dom.style.opacity = 1;
    }
}

function fadeOut() {
    for (var i = 0; i < arguments.length; ++i) {
        var dom = arguments[i];
        dom.style.opacity = 0;
        window.setTimeout(() => {
            dom.style.display = 'none';
        }, 500);
    }
}

function load() {
    if (Game.started) { return; }
    mainDom.style.opacity = 0;
    restartButton.style.opacity = 0;
    closeButton.style.opacity = 0;
    gameDom.style.display = 'flex';
    healthBar.style.display = 'block';
    touchDom.style.display = 'block';
    window.setTimeout(() => {
        gameDom.style.opacity = 1;
        healthBar.style.opacity = 1;
        restartButton.style.display = 'none';
        closeButton.style.display = 'none';
        window.setTimeout(() => {
            reset();
            updateHealthBar();
            start();
        }, 500);
    }, 500);
}

function hide() {
    gameDom.style.opacity = 0;
    window.setTimeout(() => {
        gameDom.style.display = 'none';
        mainDom.style.opacity = 1;
    }, 500);
}

function up() {
    if (player.position.y > 0) {
        player.position.y--;
    } else {
        player.position.y = grid.height - 1;
    }
    renderPlayer();
}

function down() {
    if (player.position.y < grid.height - 1) {
        player.position.y++;
    } else {
        player.position.y = 0;
    }
    renderPlayer();
}

function left() {
    if (player.position.x > 0) {
        player.position.x--;
    } else {
        player.position.x = grid.width - 1;
    }
    renderPlayer();
}

function right() {
    if (player.position.x < grid.width - 1) {
        player.position.x++;
    } else {
        player.position.x = 0;
    }
    renderPlayer();
}

document.onkeypress = (event) => {
    event = event || window.event;
    var code = event.keyCode || event.which;

    if (!Game.started) {
        if (code == 32) {
            load();
        }
        return;
    }

    event.preventDefault();

    // w - 119 , up - 38
    if (code == 119 || code == 38) {
        up();
    }
    // s - 115, down - 40
    if (code == 115 || code == 40) {
        down();
    }
    // a - 97, left - 37
    if (code == 97 || code == 37) {
        left();
    }
    // d - 100, right - 39
    if (code == 100 || code == 39) {
        right();
    }
};

function touchEvent(position) {
    var xOffset = position.x - touchOrigin.x;
    var yOffset = position.y - touchOrigin.y;

    if (xOffset > gridSize.width) {
        touchOrigin.x = position.x;
        right();
    } else if (xOffset < -gridSize.width) {
        touchOrigin.x = position.x;
        left();
    }

    if (yOffset > gridSize.height) {
        touchOrigin.y = position.y;
        down();
    } else if (yOffset < -gridSize.height) {
        touchOrigin.y = position.y;
        up();
    }
}

touchDom.ontouchstart = (event) => {
    if (Game.started) {
        const touch = event.touches[0];
        touchOrigin.x = touch.pageX;
        touchOrigin.y = touch.pageY;
    } else {
        load();
    }
};

touchDom.ontouchmove = (event) => {
    if (Game.started) {
        event.preventDefault();

        const touch = event.touches[0];
        var position = {
            x: touch.pageX,
            y: touch.pageY
        };

        touchEvent(position);
    }
};

touchDom.onmousedown = (event) => {
    mouseDown = true;
    if (Game.started) {
        touchOrigin.x = event.pageX;
        touchOrigin.y = event.pageY;
    }
};

touchDom.onmousemove = (event) => {
    if (Game.started && mouseDown) {
        event.preventDefault();

        var position = {
            x: event.pageX,
            y: event.pageY
        };

        touchEvent(position);
    }
};

touchDom.onmouseup = () => {
    mouseDown = false;
};