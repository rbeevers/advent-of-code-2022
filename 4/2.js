const fs = require('fs');

function main(inputTxt){
 
    const pairArr = inputTxt.split(/\r?\n/);

    let totalFullOverlap = 0;
    for(let i=0; i<pairArr.length; i++){
        let elves = pairArr[i].split(","); 
        let elf1 = elves[0].split("-");
        let elf2 = elves[1].split("-");

        let elf1Low = Number(elf1[0]);
        let elf1High= Number(elf1[1]);
        let elf2Low = Number(elf2[0]);
        let elf2High= Number(elf2[1]);

        if( (elf1Low >= elf2Low && elf1Low <= elf2High ) || ( elf1High >= elf2Low && elf1High <= elf2High )
         || (elf2Low >= elf1Low && elf2Low <= elf1High ) || ( elf2High >= elf1Low && elf2High <= elf1High )){
            totalFullOverlap += 1;
        }
    }

    console.log("total:" + totalFullOverlap);
}

main(fs.readFileSync('./input.txt', {encoding: 'utf-8'}));