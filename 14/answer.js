const fs = require('fs');

const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});

const testInput = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

const buildWallMap = (hasFloor = false) => {

    //init bounds by eyeballing input
    let bounds = {
        minX:500,
        maxX:0,
        minY:500,
        maxY:0,
    };
    let rowArr = input.split(/\r?\n/);

    for(let i=0; i<rowArr.length; i++){
        let coordArr = rowArr[i].split(" -> ");
        for(let j=0; j<coordArr.length; j++){
            let coords = coordArr[j].split(",");
            let coordX = Number(coords[0]);
            let coordY = Number(coords[1]);
            if(coordX > bounds.maxX){
                bounds.maxX = coordX;
            }
            if(coordX < bounds.minX){
                bounds.minX = coordX;
            }
            if(coordY > bounds.maxY){
                bounds.maxY = coordY;
            }
            if(coordY < bounds.minY){
                bounds.minY = coordY;
            }
        }
    }

    //doubling max x should give enough floor space
    let wallMap = new Array(bounds.maxX * 2).fill().map(() => new Array(bounds.maxY+5).fill("."));

    for(let i=0; i<rowArr.length; i++){
        let coordArr = rowArr[i].split(" -> ");
        for(let j=1; j<coordArr.length; j++){
            let fromCoords = coordArr[j-1].split(",");
            let toCoords = coordArr[j].split(",");
            let fromX = Number(fromCoords[0]);
            let fromY = Number(fromCoords[1]);
            let toX = Number(toCoords[0]);
            let toY = Number(toCoords[1]);
            if(fromX === toX){
                if(fromY < toY){
                    for(let k=fromY; k<=toY; k++){
                        wallMap[fromX][k] = '#';
                    }
                }else{
                    for(let k=fromY; k>=toY; k--){
                        wallMap[fromX][k] = '#';
                    }
                }
            }
            else if(fromY === toY){
                if(fromX < toX){
                    for(let k=fromX; k<=toX; k++){
                        wallMap[k][fromY] = '#';
                    }
                }else{
                    for(let k=fromX; k>=toX; k--){
                        wallMap[k][fromY] = '#';
                    }
                }
            }
            
        }
    }

    if(hasFloor){
        for(let i=0; i<wallMap.length; i++){
            wallMap[i][bounds.maxY+2] = '#';
        }
    }

    return wallMap;
}

const dropAllTheSand = (wallMap) => {
    const sandOrigin = [500,0];
    let totalSand = 0;

    while(dropSand(sandOrigin, wallMap) === true){
        totalSand++;
    };

    return totalSand;
}

const dropSand = (sandOrigin, wallMap) => {

    let sandCoord = sandOrigin.slice();
    if(wallMap[sandCoord[0]][sandCoord[1]] != "."){
        //console.log("sand couldn't spawn at " + sandCoord);
        return false;
    }
    let falling = true;

    for(let i=sandCoord[1]; i<wallMap[0].length-1; i++){
        if(wallMap[sandCoord[0]][sandCoord[1]+1] == "."){
            sandCoord[1] += 1;
        }
        else if(wallMap[sandCoord[0]-1][sandCoord[1]+1] == "."){
            sandCoord[0] -= 1;
            sandCoord[1] += 1;
        }
        else if(wallMap[sandCoord[0]+1][sandCoord[1]+1] == "."){
            sandCoord[0] += 1;
            sandCoord[1] += 1;
        }else{
            //console.log("came to rest at " + sandCoord[0] + ","+ sandCoord[1]);
            wallMap[sandCoord[0]][sandCoord[1]] = "o";
            return true;
        }
    }
    //console.log("sand fell into the abyss at " + sandCoord);
    return false;
}



const main = () => {

    let wallMap = buildWallMap();
    console.log("Sand that comes to rest, Part 1: " + dropAllTheSand(wallMap));

    wallMap = buildWallMap(true);
    console.log("Sand that comes to rest, Part 2: " + dropAllTheSand(wallMap));
}
main();