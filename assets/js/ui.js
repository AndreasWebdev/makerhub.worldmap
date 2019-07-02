let UICanvas = document.querySelector("#mainCanvas");
let UIDebugMapSizeX = document.querySelector(".debug_mapSizeX");
let UIDebugMapSizeY = document.querySelector(".debug_mapSizeY");
let UIDebugMapData = document.querySelector(".debug_mapData");
let UIDebugMapScale = document.querySelector(".debug_mapScale");

let DebugMapScale = 1;
let DebugMapOffsetX = 0;
let DebugMapOffsetY = 0;
let DebugMapMouseOffsetX = 0;
let DebugMapMouseOffsetY = 0;
let UIDebugDrawTile = 1;
let UIDebugStateDraw = false;
let UIDebugStateMove = false;

function UIDebugLoadMap() {
    loadMap(UIDebugMapSizeX.value, UIDebugMapSizeY.value, JSON.parse(UIDebugMapData.value));
}
function UIDebugRandomMap() {
    let newMap;

    if(debugActive) {
        newMap = generateMap(UIDebugMapSizeX.value, UIDebugMapSizeY.value, "debug", noiseStrength);
    } else {
        newMap = generateMap( UIDebugMapSizeX.value, UIDebugMapSizeY.value, null, noiseStrength );
    }

    loadMap(UIDebugMapSizeX.value, UIDebugMapSizeY.value, newMap);
    UIDebugMapData.value = JSON.stringify( newMap );
}
function UIDebugWaterMap() {
    let newMap = generateMap( UIDebugMapSizeX.value, UIDebugMapSizeY.value, "water", noiseStrength);
    loadMap(UIDebugMapSizeX.value, UIDebugMapSizeY.value, newMap);
    UIDebugMapData.value = JSON.stringify( newMap );
}
function UIResizeMap() {
    DebugMapScale = UIDebugMapScale.value;
    UICanvas.style.transform = "scale(" + DebugMapScale + ") translate(" + DebugMapOffsetX + "px," + DebugMapOffsetY + "px)";
}
function UIMoveMap(x, y) {
    DebugMapOffsetX = x;
    DebugMapOffsetY = y;
    UICanvas.style.transform = "scale(" + DebugMapScale + ") translate(" + DebugMapOffsetX + "px," + DebugMapOffsetY + "px)";
}
function UIDebugChangeTile(tile) {
    UIDebugDrawTile = tile;
}

// Drawing on Canvas
canvas.addEventListener('mousedown', function(e) {
    if(e.which === 1) {
        UIDebugStateDraw = true;
        document.body.style.cursor = "pointer";
    }

    if(e.which === 2) {
        UIDebugStateMove = true;
        document.body.style.cursor = "move";

        DebugMapMouseOffsetX = e.pageX;
        DebugMapMouseOffsetY = e.pageY;
    }
});
canvas.addEventListener('mouseup', function(e) {
    if(e.which === 1) {
        UIDebugStateDraw = false;
        document.body.style.cursor = "default";
    }

    if(e.which === 2) {
        UIDebugStateMove = false;
        document.body.style.cursor = "default";
    }
});
canvas.addEventListener('mousemove', function(e) {
    if(UIDebugStateDraw) {
        draw(e);
    }

    if(UIDebugStateMove) {
        let x = (e.pageX - UICanvas.offsetLeft) - (UICanvas.width / 2);
        let y = (e.pageY - UICanvas.offsetTop) - (UICanvas.height / 2);

        console.log("MoveX: " + DebugMapOffsetX + "->" + x);
        console.log("MoveY: " + DebugMapOffsetY + "->" + y);

        UIMoveMap(x, y);
    }
});
canvas.addEventListener('click', function(e) {
    draw(e);
});
function draw(e) {
    let canvasXPos = e.pageX;
    let canvasYPos = e.pageY;

    let x = Math.floor((canvasXPos - UICanvas.offsetLeft) / spriteSize);
    let y = Math.floor((canvasYPos - UICanvas.offsetTop) / spriteSize);

    drawOnMap(y, x, UIDebugDrawTile);
    UIDebugMapData.value = JSON.stringify( map );
}
