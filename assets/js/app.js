// Setup Canvas
function init(){
    console.log("Init");

    // Load Tileset
    loadTileset(0);

    // Generate first World
    if(debugActive) {
        console.log("Debug Mode On!");
        map = generateMap(canvasWidth, canvasHeight, "debug");
    } else {
        map = generateMap(canvasWidth, canvasHeight, "water");
    }

    // Draw the map after the last tile loaded successfully
    tiles[tiles.length - 1].addEventListener('load', function() {
        drawMap(debugActive);
    });
}

// Draw Map
function drawMap(debugMode = false) {
    console.log("Draw Map - Canvas Dimensions: " + canvasWidth + "x" + canvasHeight);

    // Setup Canvas
    canvas.width = canvasWidth * spriteSize;
    canvas.height = canvasHeight * spriteSize;

    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Tiles
    map.forEach(function(yRow, y) {
        yRow.forEach(function(tile, x) {
            if(debugMode) {
                ctx.beginPath();
                ctx.rect(x * spriteSize, y * spriteSize, spriteSize, spriteSize);
                ctx.fillStyle = 'rgb(' + tile * 255 + ',' + tile * 255 + ',' + tile * 255 + ')';
                ctx.fill();
            } else {
                drawTile(tile, x, y);
            }
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
    drawMap(debugActive);
}

function drawOnMap(x, y, newTile) {
    map[x][y] = newTile;
    drawMap(debugActive);
}

// Let's get this party started!
init();

// Helper Functions
