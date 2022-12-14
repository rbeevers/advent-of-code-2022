const fs = require('fs');

const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});

const testInput = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

const compareAllArrays = () => {
    //let pairsArr = testInput.split(/\n\s*\n/);
    let pairsArr = input.split(/\n\s*\n/);

    let matchTotal = 0;

    for(let i=0; i<pairsArr.length; i++){
        //console.log("\nTESTING " + i);
        let arrArr = pairsArr[i].split(/\r?\n/);

        //console.log(arrArr[0]);
        //console.log(arrArr[1])
        let leftArr = eval(arrArr[0]);
        let rightArr = eval(arrArr[1]);

        if(compareLeftRight(leftArr, rightArr)){
            matchTotal+=i+1;
        }
        //console.log(matchTotal);
    }

    return matchTotal;
}

const spotCheck = (i) => {
    let pairsArr = input.split(/\n\s*\n/);
    let matchTotal = 0;

    //console.log("\nTESTING " + i);
    let arrArr = pairsArr[i].split(/\r?\n/);

    //console.log(arrArr[0]);
    //console.log(arrArr[1])
    let leftArr = eval(arrArr[0]);
    let rightArr = eval(arrArr[1]);

    if(compareLeftRight(leftArr, rightArr)){
        matchTotal+=i+1;
    }
    //console.log(matchTotal);

    return matchTotal;
}

const compareLeftRight = (leftArr, rightArr) => {
    //console.log("New CLR");
    //console.log("left");
    //console.log(leftArr);
    //console.log("right");
    //console.log(rightArr);
    let isCorrectOrder = null;

    if(leftArr.length === 0 && rightArr.length > 0){
        //console.log("left ran out");
        isCorrectOrder = true;
    }
    for(let i=0; i<leftArr.length; i++){
            //console.log("left val");
            //console.log(leftArr[i]);
            //console.log("right val");
            //console.log(rightArr[i]);

            if(rightArr[i] === undefined){
            //console.log("right ran out");
            //console.log(leftArr[i]);
            isCorrectOrder = false;
        }else{
            if(Array.isArray(leftArr[i]) && Array.isArray(rightArr[i])){
                isCorrectOrder = compareLeftRight(leftArr[i], rightArr[i]);

            }else{
                if(Array.isArray(rightArr[i])){
                    //console.log("\n "+ i + " Compare " + leftArr[i] + " to");
                    //console.log(rightArr[i]);
                    let newLeft = [leftArr[i]];
                    isCorrectOrder = compareLeftRight(newLeft, rightArr[i])                                   
                }else if(Array.isArray(leftArr[i])){
                    //console.log("\n "+ i + " Compare leftArr to " + rightArr[i]);
                    //console.log(leftArr[i]);
                    let newRight = [rightArr[i]];
                    //console.log(newRight);
                    isCorrectOrder = compareLeftRight(leftArr[i], newRight)                               
                }else{
                    if(leftArr[i] > rightArr[i]){
                        //console.log(leftArr[i] + " > " + rightArr[i]);
                        isCorrectOrder = false;
                    }else if(leftArr[i] < rightArr[i]){
                        //console.log(leftArr[i] + " < " + rightArr[i]);
                        isCorrectOrder = true;
                    }
                }
            }
        }
        if(isCorrectOrder !== null){
            return isCorrectOrder
        }
    }
    if(isCorrectOrder == null && leftArr.length < rightArr.length){
        //console.log("leftArr ran out");
        isCorrectOrder = true;
    }

    return isCorrectOrder;
}

const bubbleSort = () => {

    let arrArr = input.replace(/\n\s*\n/gm, "\n").split(/\r?\n/);
    //let arrArr = testInput.replace(/\n\s*\n/gm, "\n").split(/\r?\n/);
    let two = arrArr.push("[[2]]") - 1;
    let six = arrArr.push("[[6]]") - 1;
    //console.log(arrArr);

    for(let i=0; i<arrArr.length; i++){
        arrArr[i] = eval(arrArr[i]);
    }

    let swaps = 1;
    while(swaps > 0){
        swaps = 0;
        for(let i=0; i<arrArr.length-1; i++){
            if(!compareLeftRight(arrArr[i], arrArr[i+1])){
                swaps++;
                let tempArr = arrArr[i];
                arrArr[i] = arrArr[i+1];
                arrArr[i+1] = tempArr;

                if(two === i){
                    two = i+1;
                }else if(two === i+1){
                    two = i;
                }else if(six === i){
                    six = i + 1;
                }else if(six === i+1){
                    six = i;
                }
            }
        }
    }
    //console.log(arrArr);
    return (two+1) * (six+1);
}

const main = () => {
    console.log("Sum matched indices: " + compareAllArrays());
    console.log("Decoder key: " + bubbleSort());
}
main();