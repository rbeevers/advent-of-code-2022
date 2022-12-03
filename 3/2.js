const fs = require('fs');

function main(inputTxt){
 
    const sackArr = inputTxt.split(/\r?\n/);
    const groupSize = 3;

    let totalShared = 0;
    let tempArr = [groupSize];

    for(let i=0; i<sackArr.length; i++){
        tempArr[i%groupSize] = sackArr[i];

        if((i+1)%groupSize == 0){
            totalShared += getItemPriority(findMatchingItem(tempArr[0], tempArr[1], tempArr[2]));
        }

    }

    console.log("total:" + totalShared);
}

const findMatchingItem = function(sack1Str, sack2Str, sack3Str){
    let sack1Arr = sack1Str.split("");
    let sack2Arr = sack2Str.split("");
    let sack3Arr = sack3Str.split("");

    let matchArr = sack1Arr.filter(itemStr => sack2Arr.includes(itemStr));

    return sack3Arr.filter(itemStr => matchArr.includes(itemStr))[0];
}

const getItemPriority = function(itemStr){
    let itemPri = itemStr.charCodeAt(0);

    if(itemPri > 96 && itemPri < 123){ //
        itemPri -= 96;
    }
    else if(itemPri > 64 && itemPri < 91){
        itemPri -= 38;
    }
    else{
        throw new Error("not alphabet");
    }
    return itemPri;
}

main(fs.readFileSync('./input.txt', {encoding: 'utf-8'}));
