const fs = require('fs');

const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});

const buildMonkeys = () => {

    let inputArr = input.split(/\r?\n/);
    let monkeys = {};
    
    let monkeyId = 0;
    for(let i=0; i<inputArr.length; i++){
        if(inputArr[i].match(/(?<=Monkey )\d+/)){
            monkeyId = inputArr[i].match(/(?<=Monkey )\d+/)[0];
            monkeys[monkeyId] = {id:monkeyId, inspected:0}
        }
        else if(inputArr[i].indexOf("Starting items: ") !== -1){
            let itemsStr = inputArr[i].replace("Starting items: ","").trim();
            monkeys[monkeyId].items = itemsStr.split(", ").map(numStr => {return Number(numStr)});
        }
        else if(inputArr[i].indexOf("Operation: new = ") !== -1){
            let opStr = inputArr[i].replace("Operation: new = ","").trim();
            monkeys[monkeyId].operation = opStr;
        }
        else if(inputArr[i].indexOf("Test: divisible by ") !== -1){
            let testStr = inputArr[i].replace("Test: divisible by ","").trim();
            monkeys[monkeyId].test = Number(testStr);
        }
        else if(inputArr[i].indexOf("If true: throw to monkey ") !== -1){
            let ifTrueStr = inputArr[i].replace("If true: throw to monkey ","").trim();
            monkeys[monkeyId].ifTrue = Number(ifTrueStr);
        }
        else if(inputArr[i].indexOf("If false: throw to monkey ") !== -1){
            let ifFalseStr = inputArr[i].replace("If false: throw to monkey ","").trim();
            monkeys[monkeyId].ifFalse = Number(ifFalseStr);
        }
    }
    return monkeys;
}

const calcMonkeyBusiness = (monkeys, rounds, worryReduction=3) => {
    let lcm = Object.values(monkeys).map(monkey => monkey.test).reduce((a, b) => a*b,1);

    for(let i=0; i<rounds; i++){
        Object.values(monkeys).forEach(monkey =>{
            while(monkey.items.length > 0){
                let item = monkey.items.shift();
                monkey.inspected++;
                item = eval(monkey.operation.replaceAll("old", item));
                item = Math.floor(item/worryReduction);
                item = item % lcm;
                if(item%monkey.test === 0){
                    monkeys[monkey.ifTrue].items.push(item);
                }else{    
                    monkeys[monkey.ifFalse].items.push(item);
                }
            }
        });
    }

    let inspections = Object.values(monkeys).map(monkey => monkey.inspected).sort((a,b) => { return b-a; });
    return(inspections[0] * inspections[1]);
}

const main = () => {
    let monkeys = buildMonkeys();
    console.log("Total Monkey Business, Part 1: " + calcMonkeyBusiness(monkeys, 20));

    monkeys = buildMonkeys();
    console.log("Total Monkey Business, Part 2: " + calcMonkeyBusiness(monkeys, 10000, 1));
}
main();