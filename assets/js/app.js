// References
let canvas = document.querySelector("#mainCanvas");
let ctx = canvas.getContext("2d");
let map = [];

// Settings
let spriteSize = 32;
let canvasWidth = 25;
let canvasHeight = 25;
let canvasCenterX = canvasWidth / 2;
let canvasCenterY = canvasHeight / 2;
let noiseStrength = 11;

// Create tiles array with empty images
let tiles = [new Image(), new Image(), new Image()];

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

function loadTileset(tileset = 0) {
    tiles[0].src = 'assets/img/tiles/' + tileset + '/0.png';
    tiles[1].src = 'assets/img/tiles/' + tileset + '/1.png';
    tiles[2].src = 'assets/img/tiles/' + tileset + '/2.png';
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

// Generate random Worldmap
function generateMap(mode = null) {
    console.log("Generating Map");

    let newMap = [];
    let noise = new SimplexNoise();

    // Looping through x and y
    let x;
    for(x = 0; x < canvasWidth; x++) {
        let y;

        // Create an empty array to fill
        newMap[x] = [];

        for(y = 0; y < canvasHeight; y++) {
            let noiseValue;

            // Map table
            // 0 - Water
            // 1 - Sand
            // 2 - Grass
            switch(mode) {
                default:
                    // Generate a noise value for this specific coordinate
                    noiseValue = noise.noise2D(x / noiseStrength, y / noiseStrength);

                    if(noiseValue < 0.2 && noiseValue > -0.2) {
                        newMap[x][y] = 1;
                    } else if(noiseValue < -0.2) {
                        newMap[x][y] = 2;
                    } else {
                        newMap[x][y] = 0;
                    }
                    break;
                case "water":
                    // "water" is just a map with water
                    newMap[x][y] = 0;
                    break;
            }
        }
    }

    return newMap;
}

function drawOnMap(x, y, newTile) {
    map[x][y] = newTile;
    drawMap();
}

// Let's get this party started!
init();

// Helper Functions