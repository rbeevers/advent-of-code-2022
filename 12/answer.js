const fs = require('fs');
const path = require('path');

const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});

const buildTerrainMap = (backward=false) => {
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
            addAvailablePaths(i,j,terrainMap,backward);     
        }
    }

    return terrainMap;
}

const addAvailablePaths = (x, y, terrainMap, backward=false) => {
    
    let place = terrainMap[x][y];
    let pathArr = [];
    if(backward){
        if(x > 0){
            if((place.altitude -terrainMap[x-1][y].altitude) < 2){
                pathArr.push([x-1,y]);
            }
        }
        if(x < (terrainMap.length -1)){
            if((place.altitude - terrainMap[x+1][y].altitude) < 2){
                pathArr.push([x+1,y]);
            }
        }
        if(y > 0){
            if((place.altitude - terrainMap[x][y-1].altitude) < 2){
                pathArr.push([x,y-1]);
            }
        }

        if(y < (terrainMap[x].length -1)){
            if((place.altitude - terrainMap[x][y+1].altitude) < 2){
                pathArr.push([x,y+1]);
            }
        }
    }else{
        if(x > 0){
            if((terrainMap[x-1][y].altitude - place.altitude) < 2){
                pathArr.push([x-1,y]);
            }
        }
        if(x < (terrainMap.length -1)){
            if((terrainMap[x+1][y].altitude - place.altitude) < 2){
                pathArr.push([x+1,y]);
            }
        }
        if(y > 0){
            if((terrainMap[x][y-1].altitude - place.altitude) < 2){
                pathArr.push([x,y-1]);
            }
        }

        if(y < (terrainMap[x].length -1)){
            if((terrainMap[x][y+1].altitude - place.altitude) < 2){
                pathArr.push([x,y+1]);
            }
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

const findPath = (terrainMap, startX, startY, searchLetters) => {
    let curPoint = terrainMap[startX][startY];

    let pathArr = [[startX,startY]];
    let pathLength = 0;
    let curNodes = 1;
    let nextNodes = 0;
    
    while(pathArr.length > 0){
        for(let i=0; i<curNodes; i++){
            curPoint = terrainMap[pathArr[0][0]][pathArr[0][1]];
            if(searchLetters.includes(curPoint.letter)){
                return pathLength;
            }
            for(let j=0; j<curPoint.paths.length; j++){
                let nextNode = terrainMap[curPoint.paths[j][0]][curPoint.paths[j][1]];
                if(nextNode.visited == undefined){
                    nextNode.visited = true;
                    pathArr.push(curPoint.paths[j]);
                    nextNodes += 1
                }
            } 
            pathArr.shift();
              
        }
        curNodes = nextNodes;
        nextNodes = 0;
        pathLength++;
    }

}


const main = () => {

    let terrainMap = buildTerrainMap();
    let endPoints = getEndPoints(terrainMap);
    console.log("Length of shortest path from S to E: " + findPath(terrainMap, endPoints.startX, endPoints.startY, ["E"]));

    terrainMap = buildTerrainMap(true);
    console.log("Length of shortest path from any a elevation to E: " + findPath(terrainMap, endPoints.endX, endPoints.endY, ["a","S"]));
}
main();