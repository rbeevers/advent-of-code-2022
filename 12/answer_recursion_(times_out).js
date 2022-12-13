const fs = require('fs');

const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});

const buildTerrainMap = () => {
    let terrainMap = [];
    let rowArr = input.split(/\r?\n/);

    for(let i=0; i<rowArr.length; i++){
        let terrainCol = [];
        let colArr = rowArr[i].split("");
        for(let j=0; j<colArr.length; j++){
            let altitude = 0;
            if(colArr[j] == "E"){
                altitude = 26;
            }else if(colArr[j] == "S"){
            }
            else{
                altitude = colArr[j].charCodeAt(0)-97
            }

            terrainCol.push(new Object({x:i,y:j,letter:colArr[j],altitude:altitude,}));                
        }
        terrainMap.push(terrainCol);
    }

    for(let i=0; i<terrainMap.length; i++){
        for(let j=0; j<terrainMap[i].length; j++){
            addAvailablePaths(i,j,terrainMap);     
            //console.log(terrainMap[i][j]);       
        }
    }

    //console.log(terrainMap);
    return terrainMap;
}

const addAvailablePaths = (x, y, terrainMap) => {
    
    let place = terrainMap[x][y];
    //console.log(x + ":" + y);
    //console.log(place);
    //console.log(terrainMap[x].length -1);
    let pathArr = [];
    if(x > 0){
        if((terrainMap[x-1][y].altitude - place.altitude) < 2){
            //console.log("can go left");
            pathArr.push("l");
        }
    }
    if(x < (terrainMap.length -1)){
        if((terrainMap[x+1][y].altitude - place.altitude) < 2){
            //console.log("can go right");
            pathArr.push("r");
        }
    }
    if(y > 0){
        if((terrainMap[x][y-1].altitude - place.altitude) < 2){
            //console.log("can go up");
            pathArr.push("u");
        }
    }

    if(y < (terrainMap[x].length -1)){
        if((terrainMap[x][y+1].altitude - place.altitude) < 2){
            //console.log("can go down");
            pathArr.push("d");
        }
    }
    place.paths = pathArr;
}

const getEndPoints = (terrainMap) => {
    let endPoints = {};
    for(let i=0; i<terrainMap.length; i++){
        for(let j=0; j<terrainMap[i].length; j++){
            if(terrainMap[i][j].letter === "S"){
                endPoints.startX = i;
                endPoints.startY = j;
            }else if(terrainMap[i][j].letter === "E"){
                endPoints.endX = i;
                endPoints.endY = j;
            }
        }
    }
    return endPoints
}


const getAlphabet = () => {
    var a = 97;
    var charArray = {};
    for (var i = 0; i<26; i++){
        charArray[String.fromCharCode(a + i)] = String.fromCharCode(a + i);
    }
    return charArray;
}

const findPath = (terrainMap, startX, startY, answerArr=[], pathArr=[]) => {
    let curPoint = terrainMap[startX][startY];
    console.log(curPoint);
    if(curPoint.letter === "E"){
        answerArr.push(pathArr.length);
    }else{
        if(pathArr.some((coords) => coords[0]===(curPoint.x) && coords[1]===curPoint.y )){

        }else{
            pathArr.push([curPoint.x,curPoint.y]);
            for(let i=0; i<curPoint.paths.length; i++){
               // console.log(pathArr.length + "checking " +curPoint.paths[i] + " " + pathArr.some((coords) => coords[0]===(curPoint.x-1) && coords[1]===curPoint.y ));
                if(curPoint.paths[i] === "l" && pathArr.some((coords) => coords[0]===(curPoint.x-1) && coords[1]===curPoint.y ) === false){
                    startX -= 1;
                }else if(curPoint.paths[i] === "r" && pathArr.some((coords) => coords[0]===(curPoint.x+1) && coords[1]===curPoint.y ) === false){
                    startX += 1;
                }else if(curPoint.paths[i] === "u" && pathArr.some((coords) => coords[0]===curPoint.x && coords[1]===(curPoint.y-1) ) === false){
                    startY -= 1;
                }else if(curPoint.paths[i] === "d" && pathArr.some((coords) => coords[0]===curPoint.x && coords[1]===(curPoint.y+1) ) === false){
                    startY += 1;
                }
                if(startX == curPoint.x && startY == curPoint.y){
                    
                }else{
                    console.log("now looking " + startX + " " + startY + " " + curPoint.paths[i]);
                    console.log(pathArr);
                    findPath(terrainMap, startX, startY, answerArr, pathArr.slice());
                }
            }

        }
    }
}



const main = () => {

    let terrainMap = buildTerrainMap();

    let endPoints = getEndPoints(terrainMap);

    let answerArr = [];
    findPath(terrainMap, endPoints.startX, endPoints.startY, answerArr);
    console.log(answerArr.sort());
    //let pathArr = [[0,1],[1,1]];
    //console.log(pathArr.some((coords) => coords[0]===1 && coords[1]===2 ));
}
main();