// References
let canvas = document.querySelector("#mainCanvas");
let ctx = canvas.getContext("2d");
let map = [];

// Settings
let spriteSize = 32;
let canvasWidth = 25;
let canvasHeight = 25;

// Setup Canvas
function init(){
    console.log("Init");

    // Load Tileset
    loadTileset(0);

    // Generate first World
    map = generateMap();

    // Draw the map after the last tile loaded successfully
    tiles[tiles.length - 1].addEventListener('load', function() {
        drawMap();
    });
}

// Draw Map
function drawMap() {
    console.log("Draw Map - Canvas Dimensions: " + canvasWidth + "x" + canvasHeight);

    // Setup Canvas
    canvas.width = canvasWidth * spriteSize;
    canvas.height = canvasHeight * spriteSize;

    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Tiles
    map.forEach(function(yRow, y) {
        yRow.forEach(function(tile, x) {
            drawTile(tile, x, y);
        });
    });
}

function drawTile(tile, x, y) {
    ctx.drawImage(tiles[tile], x * spriteSize, y * spriteSize, spriteSize, spriteSize);
}

function loadMap(width, height, mapData) {
    console.log("Loading Map");

    // Reset dimensions
    canvasWidth = width;
    canvasHeight = height;

    // Redraw map with new data
    map = mapData;
    drawMap();
}

function drawOnMap(x, y, newTile) {
    map[x][y] = newTile;
    drawMap();
}

// Let's get this party started!
init();

// Helper Functions
