// Generate random Worldmap
function generateMap(width = 25, height = 25, mode = null, noiseStrength = 5) {
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
