const fs = require('fs');

const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});

const countTailPositions = (knots) => {
    let moveArr = input.split(/\r?\n/);

    let posArr = [];
    for(let i=0; i<knots; i++){
        posArr.push([0,0]);
    }

    let tailArr = [
        [0,0]
    ];

    for(let i=0; i<moveArr.length; i++){
        let moveParts = moveArr[i].split(" ");

        for(let j=0; j<moveParts[1]; j++){
            switch(moveParts[0]){
                case 'R':
                    posArr[0][0]++;
                    break;
                case 'L':
                    posArr[0][0]--;
                    break;
                case 'U':
                    posArr[0][1]++;
                    break;
                case 'D':
                    posArr[0][1]--;
                    break;
            }

            for(let k=1; k<knots; k++){

                if(Math.abs(posArr[k-1][0]-posArr[k][0]) > 1 || Math.abs(posArr[k-1][1]-posArr[k][1]) > 1){
                    if(posArr[k-1][0]-posArr[k][0] > 0){
                        posArr[k][0]++;
                    }else if(posArr[k-1][0]-posArr[k][0] < 0){
                        posArr[k][0]--;
                    }
                    
                    if(posArr[k-1][1]-posArr[k][1] > 0){
                        posArr[k][1]++;

                    }else if(posArr[k-1][1]-posArr[k][1] < 0){
                        posArr[k][1]--;
                    }
                }
                            
                if(k === knots-1){
                    if(!tailArr.some(pos => pos[0] == posArr[k][0]  && pos[1] == posArr[k][1])){
                        tailArr.push([posArr[k][0],posArr[k][1]]);
                    }                     
                }
            }
        }
 
    }
    return(tailArr.length);
}

const main = () => {

    console.log("Total tail positions, 2 knots: " + countTailPositions(2));
    console.log("Total tail positions, 10 knots: " + countTailPositions(10));
}
main();