const fs = require('fs');

function main(inputTxt){
 
    const inputArr = inputTxt.split(/\r?\n/);
    const numStacks = 9;

    let stacks = [];
    for ( var i = 1; i <= numStacks; i++ ) {
        stacks[i] = []; 
    }

    let stacksBuilt = false;
    for(let i=0; i<inputArr.length; i++){
        if(!stacksBuilt){
            for(let j=1; j<=numStacks; j++){
                let crate = inputArr[i].charAt(1+((j-1)*4));
                if(crate.match(/[a-z]/i)){
                    stacks[j].push(crate);
                }else if(crate.match(/[0-9]/)){
                    stacksBuilt = true;
                    for ( var k = 1; k <= numStacks; k++) {
                        stacks[k] = stacks[k].reverse(); 
                    }
                    break;
                }
            }
        }else{
            if(inputArr[i].trim() != ""){
                let matches = inputArr[i].match(/\d+/g);
                let cratesToMove = matches[0];
                let fromStack = matches[1];
                let toStack = matches[2];
                let movingStack = [];

                for(j=0; j<cratesToMove; j++){
                    movingStack.push(stacks[fromStack].pop());
                }
                stacks[toStack] = stacks[toStack].concat(movingStack.reverse());
            }
        }
    }

    let tops = ""
    for ( var i = 1; i <= numStacks; i++ ) {
        tops += stacks[i].pop();
    }
    console.log(tops);
}

main(fs.readFileSync('./input.txt', {encoding: 'utf-8'}));