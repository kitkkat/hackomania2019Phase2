// Common custom colours
const RED = '#EF3B3C';
const BLUE = '#4CBCF0';
const YELLOW = '#FEF200';
const WHITE = '#F3F3F3';
const BLACK = '#000000';

const gameDom = document.getElementById('game');
const mainDom = document.getElementById('original');

const touchDom = document.getElementById('touch');

const touchSize = {
    width: window.innerWidth,
    height: window.innerHeight
};

// score label
const scoreLabel = document.getElementById('score');

// Grid dom and context
const gridDom = document.getElementById('grid');
const gridContext = gridDom.getContext('2d');

const grid = {
    width: 10,
    height: 10
};

const gridSize = {
    width: touchSize.width > 620 ? 500 / grid.width : touchSize.width * 0.8 / grid.width,
    height: touchSize.width > 620 ? 500 / grid.height : touchSize.width * 0.8 / grid.height
};

// Tile attributes
const tile = {
    spacing : 10
};

tile.width = (gridDom.width - tile.spacing) / grid.width;
tile.height = (gridDom.height - tile.spacing) / grid.height;
tile.innerWidth = tile.width - tile.spacing;
tile.innerHeight = tile.height - tile.spacing;

const maxHealth = 10;
const healthBar = document.getElementById('health');
const healthBarContext = healthBar.getContext('2d');

const restartButton = document.getElementById('restart');
const closeButton = document.getElementById('close');