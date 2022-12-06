const fs = require('fs');

const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});

const findFirstMarker = (input, markerLength) => {
    let charArr = input.split("");
    let firstMarker = 0;
    let trailingArr = [];

    for(i=0; i<charArr.length; i++){
        while(trailingArr.includes(charArr[i])){
            trailingArr.shift();
        }
        trailingArr.push(charArr[i]);

        if(trailingArr.length == markerLength){
            firstMarker = i+1;
            break;
        }  
    }
    return firstMarker;
}

console.log("Part 1 Answer is:" + findFirstMarker(input, 4));
console.log("Part 2 Answer is:" + findFirstMarker(input, 14))