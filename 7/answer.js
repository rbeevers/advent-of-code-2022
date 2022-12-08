const fs = require('fs');

const input = fs.readFileSync('./input.txt', {encoding: 'utf-8'});

let allDirectory = {};

const buildDirs = (input) => {

    let checkSum = 0
    let terminalArr = input.split(/\r?\n/);;
    let currentDirArr = [];
    allDirectory = createDir("/",null);
    let currentDir = allDirectory;

    for(i=1; i<terminalArr.length; i++){ //skipping first line, already created top level dir
        let lineArr = terminalArr[i].split(" ");
        if(lineArr[0] == "$"){
            if(lineArr[1] == "cd"){
                if(lineArr[2] == ".."){
                    currentDirArr.pop();
                    currentDir = getDirByArr(currentDir.parentArr, allDirectory);
                }else{
                    currentDirArr.push(lineArr[2]);
                    currentDir = getDir(lineArr[2], currentDir);
                }
            }
        }else{
            if(lineArr[0] == "dir"){
                getDir(lineArr[1], currentDir);
            }else{ //should only be a number and is a file
                if(!fileExists(lineArr[1], currentDir)){
                    createFile(lineArr[1], lineArr[0], currentDir);
                    checkSum += Number(lineArr[0]);
                }
            }
        }

    }
   
    return allDirectory;
}

const countDirByMaxSize = (directory, maxSize) =>{
    let retSize = 0;
    if(directory.size <= maxSize){
        retSize += directory.size;
    }
    directory.dirs.forEach(dir => {
        retSize += countDirByMaxSize(dir, maxSize);
    });
    return retSize;
}

const findMinDirToDelete = (directory, spaceToDelete, currentLow) =>{
    let retSpace = currentLow;

    directory.dirs.forEach(dir => {
        if(dir.size >= spaceToDelete && dir.size < retSpace){
            retSpace = dir.size;
        }
        retSpace = findMinDirToDelete(dir, spaceToDelete, retSpace);
    });

    return retSpace;
}


const dirExists = (dirName, currentDir) => {
    let tempDirIndex = currentDir.dirs.findIndex(dir => dir.name === dirName);
    if(tempDirIndex != -1){
        return true;
    }else{
        return false;
    }

}

const fileExists = (fileName, currentDir) => {
    let tempFileIndex = currentDir.files.findIndex(file => file.name === fileName);
    if(tempFileIndex != -1){
        return true;
    }else{
        return false;
    }

}

const getDir = (dirName, parentDir) => {
    let tempDirIndex = parentDir.dirs.findIndex(dir => dir.name === dirName);
    if(tempDirIndex != -1){
        tempDir = parentDir.dirs[tempDirIndex];
    }else{
        tempDir = createDir(dirName, parentDir);
        parentDir.dirs.push(tempDir);
    }
    return tempDir;
}

const getDirByArr = (dirParentArr, allDirectory) => {
    let tempDir = allDirectory;

    dirParentArr.forEach(parentDirName => {
        if(parentDirName != "/"){
            let parentDirIndex = tempDir.dirs.findIndex(dir => dir.name === parentDirName);
            if(parentDirIndex != -1){
                tempDir = tempDir.dirs[parentDirIndex];
            }else{
                throw new Error ("a directory wasn't found: " + parentDirName + " of " + dirParentArr.join("/"));
            }
        }
    });

    return tempDir;
}

const createDir = (dirName,dirParent) => {
    let parentArr = [];
    if(dirParent != null){
        parentArr = parentArr.concat(dirParent.parentArr);
        parentArr.push(dirParent.name);
    }

    let newDir = {
        name:dirName,
        parentArr:parentArr,
        size:0,
        files:[],
        dirs:[],
    }
    return newDir;
} 

const createFile = (fileName, size, dir) => {
    let newFile = {
        name:fileName,
        size:size,
    }
    dir.files.push(newFile);
    addSizeToDir(size, dir, allDirectory);
} 

const addSizeToDir = (sizeToAdd, dirToAdd, allDirectory) => {
    let parentDir = allDirectory;

    if(dirToAdd.name != "/"){
        parentDir.size += Number(sizeToAdd);
    }

    dirToAdd.parentArr.forEach(parentDirName => {
        if(parentDirName != "/"){
            let parentDirIndex = parentDir.dirs.findIndex(dir => dir.name === parentDirName);
            if(parentDirIndex != -1){
                parentDir = parentDir.dirs[parentDirIndex];
                parentDir.size += Number(sizeToAdd);
            }
        }
    });
    dirToAdd.size += Number(sizeToAdd);            

}



buildDirs(input);

console.log("Part 1 answer: " + countDirByMaxSize(allDirectory, 100000));

console.log("Part 2 answer: " + findMinDirToDelete(allDirectory, (30000000-(70000000 - allDirectory.size)), 70000000));



