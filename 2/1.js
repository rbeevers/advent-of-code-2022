const fs = require('fs');
const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});

function main(){
    const inputTranslate = allReplace(input, {'A':'R','X':'R','B':'P','Y':'P','C':'S','Z':'S'});

    const guideArr = inputTranslate.split(/\r?\n/);

    guideArr.forEach((game, i, arr) => {
        let myHand = game.substring(2,3);
        let theirHand = game.substring(0,1);
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

const gameOutcome = {
    'R' : {
        'R' : 3,
        'P' : 0,
        'S' : 6,
    },
    'P' : {
        'R' : 6,
        'P' : 3,
        'S' : 0,
    },
    'S' : {
        'R' : 0,
        'P' : 6,
        'S' : 3,
    },
}

const gameBonus = {
    'R' : 1,
    'P' : 2,
    'S' : 3,
}

const playGame = (theirHand, myHand) => {
    let total = gameOutcome[myHand][theirHand] + gameBonus[myHand];
    return total;
}
  
main();