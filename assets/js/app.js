// References
let canvas = document.querySelector("#mainCanvas");
let ctx = canvas.getContext("2d");
let map = [];

// Settings
let spriteSize = 32;
let canvasWidth = 3 * spriteSize;
let canvasHeight = 3 * spriteSize;
let canvasCenterX = canvasWidth / 2;
let canvasCenterY = canvasHeight / 2;

// Tiles
let tiles = [new Image(), new Image()];

// Setup Canvas
function init(){
    console.log("Setup");

    // Load Tileset
    loadTileset(0);

    // Generate first World
    map = generateMap(0);

    // Draw Map
    tiles[tiles.length - 1].addEventListener('load', function() {
        drawMap();
    });
}

function loadTileset(tileset = 0) {
    tiles[0].src = 'assets/img/tiles/' + tileset + '/0.png';
    tiles[1].src = 'assets/img/tiles/' + tileset + '/1.png';
}

// Draw Map
function drawMap() {
    console.log("Draw Map");
    console.log("Canvas Dimensions: " + canvasWidth + "x" + canvasHeight);

    // Setup Canvas
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Loop through map
    map.forEach(function(xRow, x) {
        xRow.forEach(function(tile, y) {
            drawTile(tile, x, y);
        });
    })

    // Draw Tiles
}

function drawTile(tile, x, y) {
    ctx.drawImage(tiles[tile], x * spriteSize, y * spriteSize, spriteSize, spriteSize);
}

function loadMap(width, height, mapData) {
    console.log("Loading Map");

    canvasWidth = width * spriteSize;
    canvasHeight = height * spriteSize;

    map = mapData;
    drawMap();
}

// Generate random Worldmap
function generateMap(seed = null) {
    console.log("Generating Map");

    // TODO: Random Generation;
    return [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
}

// Let's get this party started!
init();

// Helper Functions
