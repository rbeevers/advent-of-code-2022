const fs = require('fs');

const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});

const buildCycleArr = () => {

    let instArr = input.split(/\r?\n/);
    let cycleArr = [1];
    let currentX = 1;

    for(let i=0; i<instArr.length; i++){
        if(instArr[i] == "noop"){
            cycleArr.push(currentX);
        }else{
            let instParts = instArr[i].split(" ");
            cycleArr.push(currentX);
            currentX += Number(instParts[1]);
            cycleArr.push(currentX);     
        }
    }
    return cycleArr;
}

const totalSignalStrength = (cycleArr) => {
    let total = 0
    for(let i=19; i<220; i+=40){
        total += cycleArr[i] * (i+1);
    }
    return total;
}

const drawCRT = (cycleArr) => {
    const CRTwidth = 40;

    let line = "";
    for(let i=0; i<cycleArr.length; i++){
        if(i%CRTwidth == 0){
            console.log(line);
            line = "";
        }

        if(Math.abs(cycleArr[i] - (i%CRTwidth)) < 2){
            line += "#"
        }else{
            line += ".";
        }
    }
}

const main = () => {
    let cycleArr = buildCycleArr();

    console.log("Total Signal Strength: " + totalSignalStrength(cycleArr));

    console.log("CRT Image Below: ");
    drawCRT(cycleArr);
}
main();