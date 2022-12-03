const fs = require('fs');

function main(inputTxt){
 
    const sackArr = inputTxt.split(/\r?\n/);

    let totalShared = sackArr.reduce( function(total, sackStr){
        let compartment1Str = sackStr.substr(0,(sackStr.length/2));
        let compartment2Str = sackStr.substr((sackStr.length/2),sackStr.length - (sackStr.length/2));

        console.log(compartment1Str);
        console.log(compartment2Str);

        let matchingItem = findMatchingItem(compartment1Str,compartment2Str);

        console.log(matchingItem);

        let itemPriority = getItemPriority(matchingItem);
        console.log(matchingItem + " - " + itemPriority)

        return total + itemPriority;

    },0);

    console.log("total:" + totalShared);





}



const findMatchingItem = function(compartment1Str, compartment2Str){
    let compartment1Arr = compartment1Str.split("");
    let compartment2Arr = compartment2Str.split("");

    return compartment1Arr.filter(itemStr => compartment2Arr.includes(itemStr))[0];
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
