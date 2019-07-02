// Create tiles array with empty images
let tiles = [];
let usedTiles = [0, 1, 2, 99];

// Load in a desired tileset
function loadTileset(tileset = 0) {
    tiles.length = usedTiles.length;

    usedTiles.forEach(function(element) {
        tiles[element] = new Image();
        tiles[element].src = 'assets/img/tiles/' + tileset + '/' + element + '.png';
    });
}
