let UIDebugMapSizeX = document.querySelector(".debug_mapSizeX");
let UIDebugMapSizeY = document.querySelector(".debug_mapSizeY");

let UIDebugMapData = document.querySelector(".debug_mapData");

function UIDebugLoadMap() {
    loadMap(UIDebugMapSizeX.value, UIDebugMapSizeY.value, JSON.parse(UIDebugMapData.value));
}
