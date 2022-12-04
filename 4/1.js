const fs = require('fs');

function main(inputTxt){
 
    const pairArr = inputTxt.split(/\r?\n/);

    let totalFullOverlap = 0;
    for(let i=0; i<pairArr.length; i++){
        let elves = pairArr[i].split(","); 
        let elf1 = elves[0].split("-");
        let elf2 = elves[1].split("-");

        if((Number(elf1[0]) <= Number(elf2[0]) && Number(elf1[1]) >= Number(elf2[1]) ) || (Number(elf1[0]) >= Number(elf2[0]) && Number(elf1[1]) <= Number(elf2[1]))){
            totalFullOverlap += 1;
        }
    }

    console.log("total:" + totalFullOverlap);
}

main(fs.readFileSync('./input.txt', {encoding: 'utf-8'}));