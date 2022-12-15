const fs = require('fs');

const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});
const inputExample = fs.readFileSync('./inputExample.txt', {encoding: 'utf-8'});

const buildSensors = (input) => {

    let rowArr = input.split(/\r?\n/);
    let sensorsArr = [];

    for(let i=0; i<rowArr.length; i++){
        let sensorObj = {};
        let sensorBeacon = rowArr[i].split(": ");
        sensorObj.x = Number(sensorBeacon[0].match(/(?<=x=)-?\d+/)[0]);
        sensorObj.y = Number(sensorBeacon[0].match(/(?<=y=)-?\d+/)[0]);
        sensorObj.beaconX = Number(sensorBeacon[1].match(/(?<=x=)-?\d+/)[0]);
        sensorObj.beaconY = Number(sensorBeacon[1].match(/(?<=y=)-?\d+/)[0]);
        sensorObj.distance = Math.abs(sensorObj.beaconX - sensorObj.x) + Math.abs(sensorObj.beaconY - sensorObj.y);
        sensorsArr.push(sensorObj);
    }
    return sensorsArr;
}

//I think this works but too slow
/*
const buildLineArray = (sensorArr, y) => {
    let blockedArr = [];
    sensorArr.forEach(sensor => {
        //console.log(sensor);
        let yDistance = Math.abs(y - sensor.y);
        if(yDistance <= sensor.distance){
            let xDistance = Math.abs(sensor.distance - yDistance);
            console.log(xDistance);
            for(let i=(sensor.x-xDistance); i<=(sensor.x+xDistance); i++){
                if(blockedArr.indexOf(i) === -1){
                    blockedArr.push(i);
                }
            }
        } 
        //console.log(blockedArr);
    });

    //remove beacons from total
    sensorArr.forEach(sensor => {
        if(sensor.beaconY === y){
            let beaconIndex = blockedArr.indexOf(sensor.beaconX);
            if(beaconIndex !== -1){
                blockedArr.splice(beaconIndex, 1);
            }
        }
    });


    console.log(blockedArr.sort());
    return blockedArr.length;
}
*/

const getBlockedRanges = (sensorArr, y) => {
    let blockedRangeArr = [];
    sensorArr.forEach(sensor => {
        //console.log(sensor);
        let yDistance = Math.abs(y - sensor.y);
        if(yDistance <= sensor.distance){
            let xDistance = Math.abs(sensor.distance - yDistance);
            let minX = sensor.x-xDistance;
            let maxX = sensor.x+xDistance;
            //console.log(minX + "-" + maxX);

            let isOverlap = false;
            blockedRangeArr.forEach((blockedRange) => {
                if(blockedRange[0] <= minX && blockedRange[1] >= maxX){ //this range contains new range, do nothing
                    isOverlap = true;
                }else{
                    if(blockedRange[0] >= minX && blockedRange[0] <= maxX){
                        blockedRange[0] = minX;
                        isOverlap = true;
                    }
                    if(blockedRange[1] <= maxX && blockedRange[1] >= minX){
                        blockedRange[1] = maxX;
                        isOverlap = true;
                    }
                }
            });
            if(!isOverlap){
                blockedRangeArr.push([minX,maxX]);
            }
            //console.log(blockedRangeArr);
        }
    });

    let newBlockedRangeArr = [];
    blockedRangeArr.forEach((blockedRange) => {
        let isOverlap = false;
        newBlockedRangeArr.forEach((newBlockedRange) => {
            if(blockedRange[0] >= newBlockedRange[0] && blockedRange[1] <= newBlockedRange[1]){ //this range contains new range, do nothing
                isOverlap = true;
            }else{
                if(blockedRange[0] <= newBlockedRange[0] && blockedRange[1] >= newBlockedRange[0]){
                    newBlockedRange[0] = blockedRange[0];
                    isOverlap = true;
                }
                if(blockedRange[1] >= newBlockedRange[1] && blockedRange[0] <= newBlockedRange[1]){
                    newBlockedRange[1] = blockedRange[1];
                    isOverlap = true;
                }

            }
        });
        if(!isOverlap){
            newBlockedRangeArr.push([blockedRange[0],blockedRange[1]]);
        }
    });

    newBlockedRangeArr.sort((a,b) => a[0] - b[0] );

    return newBlockedRangeArr;    
}

const totalBlockedOneLine = (sensorArr, checkY) => {
    let cantBeBeacons = 0;

    let blockedRangeArr = getBlockedRanges(sensorArr, checkY);

    blockedRangeArr.forEach(blockedRange => {
        //console.log(blockedRange);
        cantBeBeacons += blockedRange[1] - blockedRange[0] + 1;
        //console.log(cantBeBeacons);
    });

    //remove beacons from total
    let beaconsOnLine = [];
    sensorArr.forEach(sensor => {
        if(sensor.beaconY === checkY){
            if(!beaconsOnLine.some((beacon) => beacon[0] === sensor.beaconX && beacon[1] === sensor.beaconY)){
                beaconsOnLine.push([sensor.beaconX, sensor.beaconY])
            }
        }
    });

    cantBeBeacons -= beaconsOnLine.length;
    return cantBeBeacons;
}

const findFirstNonBlocked = (sensors, bounds) => {
    for(let i=bounds.minY; i<=bounds.maxY; i++){
        //console.log("checking y:" + i);
        let blockedRangeArr = getBlockedRanges(sensors, i);
        //console.log(blockedRangeArr.length);
        if(blockedRangeArr.length === 1){
            if(blockedRangeArr[0][0] < bounds.minX && blockedRangeArr[0][1] > bounds.maxX){
                //console.log("range too wide");
            }
            else if(blockedRangeArr[0][0] > bounds.minX){
                //console.log("found on bottom");
                return [bounds.minX, i];
            }
            else if(blockedRangeArr[0][1] < bounds.maxX){
                //console.log("found on top");
                return [blockedRangeArr[0][1]+1, i];
            }
        }else{
            //console.log(blockedRangeArr);
            let checkFromX = bounds.minX;
            for(let j=0; j<blockedRangeArr.length; j++){
                if(blockedRangeArr[j][0] > checkFromX){
                    //console.log("found between");
                    return [checkFromX,i];
                }else{
                    checkFromX = blockedRangeArr[j][1]+1;
                }
            }
        }
    }
}

const calcTuningFrequency = (coords) => {
    return coords[0] * 4000000 + coords[1];
}

const main = (example = false) => {

    let sensors = [];
    if(example){
        sensors = buildSensors(inputExample);
    }else{
        sensors = buildSensors(input);
    }

    //part 1
    let checkY = 2000000;
    if(example){
        checkY = 10;
    }

    console.log(totalBlockedOneLine(sensors,checkY) + " can't be beacons on y:" + checkY);

    //part 2
    let bounds = {
        minX:0,
        maxX:4000000,
        minY:0,
        maxY:4000000,
    }
    if(example){
        bounds = {
            minX:0,
            maxX:20,
            minY:0,
            maxY:20,
        }    
    }
    let firstNonBlocked = findFirstNonBlocked(sensors,bounds);
    console.log("Tuning Frequency: " + calcTuningFrequency(firstNonBlocked));
}
main();

