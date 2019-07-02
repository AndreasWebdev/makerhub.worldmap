// Settings
let noiseStrength = 15;
let noiseFalloff = 0;
let noiseFalloffStrength = 1.5;

// Generate random Worldmap
function generateMap(width = 25, height = 25, mode = null, noiseStrength = 11) {
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
            let noiseValueCombined;

            // Map table
            // 0 - Water
            // 1 - Sand
            // 2 - Grass
            switch(mode) {
                default:
                    // Generate a noise value for this specific coordinate
                    noiseFalloff = furthestDistanceFromCentre - euclideanDistance({x, y}, centrePoint) * noiseFalloffStrength;
                    noiseValue = clamp(noise.noise2D(x / noiseStrength, y / noiseStrength), 0, 1);
                    noiseValueCombined = clamp(noiseValue / 2 * noiseFalloff, 0, 1);

                    switch(true) {
                        case(noiseValueCombined < 0.2):
                            newMap[x][y] = 0;
                            break;
                        case(noiseValueCombined < 1):
                            newMap[x][y] = 1;
                            break;
                        default:
                            newMap[x][y] = 2;
                            break;
                    }
                    break;
                case "debug":
                    noiseFalloff = furthestDistanceFromCentre - euclideanDistance({x, y}, centrePoint) * noiseFalloffStrength;
                    noiseValue = clamp(noise.noise2D(x / noiseStrength, y / noiseStrength), 0, 1);
                    noiseValueCombined = clamp(noiseValue / 2 * noiseFalloff, 0, 1);

                    switch(true) {
                        case(noiseValueCombined < 0.2):
                            newMap[x][y] = 0;
                            break;
                        case(noiseValueCombined < 1):
                            newMap[x][y] = 0.5;
                            break;
                        default:
                            newMap[x][y] = 1;
                            break;
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

function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
}

function euclideanDistance(point1, point2) {
    return Math.sqrt(
        Math.abs(Math.pow(point1.x - point2.x, 2)) +
        Math.abs(Math.pow(point1.y - point2.y, 2))
    )
}

var centrePoint = {x: Math.floor(canvasWidth / 2), y: Math.floor(canvasHeight / 2)};

var furthestDistanceFromCentre = euclideanDistance(
    {x: 0, y: 0}, centrePoint
);
