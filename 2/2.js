const fs = require('fs');
const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});


function main(){
    const inputTranslate = allReplace(input, {'A':'R','X':'L','B':'P','Y':'D','C':'S','Z':'W'});

    const guideArr = inputTranslate.split(/\r?\n/);

    guideArr.forEach((game, i, arr) => {
        let myHand = game.substring(2,3);
        let theirHand = game.substring(0,1);
        //console.log(myHand + " - " + theirHand + ' = ' + playGame(theirHand,myHand));

    });

    let totalScore = guideArr.reduce( function(total, gameStr){
        let myHand = gameStr.substring(2,3);
        let theirHand = gameStr.substring(0,1);
        let score = playGame(theirHand,myHand);
        console.log(theirHand + " - " + myHand + ' = ' + playGame(theirHand,myHand));
        return total + score;
    }, 0 );

    console.log('total score: ' + totalScore);
}

const allReplace = function(str, obj) {
    for (var x in obj) {
        str = str.replace(new RegExp(x, 'g'), obj[x]);
    }
    return str;
};

const gameBonus = {
    'R' : 1,
    'P' : 2,
    'S' : 3,
}

const gameOutcome = {
    'R' : {
        'W' : 6 + gameBonus['P'],
        'L' : 0 + gameBonus['S'],
        'D' : 3 + gameBonus['R'],
    },
    'P' : {
        'W' : 6 + gameBonus['S'],
        'L' : 0 + gameBonus['R'],
        'D' : 3 + gameBonus['P'],
    },
    'S' : {
        'W' : 6 + gameBonus['R'],
        'L' : 0 + gameBonus['P'],
        'D' : 3 + gameBonus['S'],
    },
}

const playGame = (theirHand, myHand) => {
    let total = gameOutcome[theirHand][myHand];
    return total;
}
  
main();