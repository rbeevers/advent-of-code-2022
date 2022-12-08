const fs = require('fs');

const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});

const buildGrid = (input) => {
    let treeGrid = [];
    let treeArr = input.split(/\r?\n/);
    treeArr.forEach(treeRow => {
        treeCols = treeRow.split("");
        treeGrid.push(treeCols);
    });
    return treeGrid;
}

const isTreeVisible = (treeGrid, x, y) => {
    let gridSize = treeGrid.length;
    let height= treeGrid[x][y];
    let visible = false;

    if(x == 0 || y == 0 || x == (gridSize-1) || y == (gridSize-1)){
        visible = true;
    }else{
        visible = true;
        for(let i=0; i<x; i++){
            if(treeGrid[i][y] >= height){
                visible = false;
                break;
            }
        }
        if(!visible){
            visible = true;
            for(let i=x+1; i<gridSize; i++){
                if(treeGrid[i][y] >= height){
                    visible = false;
                    break;
                }
            }    
        }
        if(!visible){
            visible = true;
            for(let i=0; i<y; i++){
                if(treeGrid[x][i] >= height){
                    visible = false;
                    break;
                }
            }    
        }
        if(!visible){
            visible = true;
            for(let i=y+1; i<gridSize; i++){
                if(treeGrid[x][i] >= height){
                    visible = false;
                    break;
                }
            }    
        }
    }
    return visible;
}

const getScenicScore = (treeGrid, x, y) => {
    let gridSize = treeGrid.length;
    let height= treeGrid[x][y];

    let [left,right,up,down] = [0,0,0,0];

    if(x > 0 && y > 0 && x < (gridSize-1) && y < (gridSize-1)){

        for(let i=x-1; i>=0; i--){
            left++;
            if(treeGrid[i][y] >= height){
                break;
            }
        }

        for(let i=x+1; i<gridSize; i++){
            right++;
            if(treeGrid[i][y] >= height){
                break;
            }
        }    

        for(let i=y-1; i>=0; i--){
            up++;
            if(treeGrid[x][i] >= height){
                break;
            }
        }    

        for(let i=y+1; i<gridSize; i++){
            down++;
            if(treeGrid[x][i] >= height){
                break;
            }
        }    
    }

    return left * right * up * down;

}

const countVisibleTrees = (treeGrid) => {
    let gridSize = treeGrid.length;
    let visibleCount = 0
    for(let i=0; i<gridSize; i++){
        for(let j=0; j<gridSize; j++){
            if(isTreeVisible(treeGrid,i,j)){
                visibleCount++;
            }
        }
    }
    return visibleCount;
}

const getHighestScenicScore = (treeGrid) => {
    let gridSize = treeGrid.length;
    let highestScore = 0
    for(let i=0; i<gridSize; i++){
        for(let j=0; j<gridSize; j++){
            let score = getScenicScore(treeGrid, i, j);
            if(score > highestScore){
                highestScore = score;
            }
        }
    }
    return highestScore;
}

const main = () => {
   
    let treeGrid = buildGrid(input); 
    let gridSize = treeGrid.length;

    console.log("Total visible trees: " + countVisibleTrees(treeGrid));
    console.log("Highest scenic score: " + getHighestScenicScore(treeGrid));
}
main();

