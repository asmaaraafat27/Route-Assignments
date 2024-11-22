/*1- Write a function that prints the full path of the current file.*/

function printFilePath() {
    console.log(__filename);
}
printFilePath();

//-----------------------------------------------------------------------
/*2- Write a function that takes a file path and returns its file extension.*/

const path = require('path');
function getFileExtension(filePath) {
    return path.extname(filePath);
}
console.log(getFileExtension('/path/to/file.txt'));

//-----------------------------------------------------------------------
/*3- Write a function that checks if a given path is absolute.*/

const path = require('path');
function isAbsolutePath(filePath) {
    return path.isAbsolute(filePath);
}
console.log(isAbsolutePath('/path/to/file.txt'));
console.log(isAbsolutePath('file.txt'));

//-----------------------------------------------------------------------
/*4- Write a function that joins two paths.*/

const path = require('path');
function joinPaths(path1, path2) {
    return path.join(path1, path2);
}
console.log(joinPaths('folder1', 'folder2/file.txt')); 

//-----------------------------------------------------------------------
/*5- Write a function that demonstrates the difference between path.parse and path.format. 
The function should take a file path as input, parse it, log the parsed object to the console,
then reformat it and log the formatted path to the console.*/

const path = require('path');
function demonstrateParseAndFormat(filePath) {
    const parsedPath = path.parse(filePath);
    console.log("Parsed Path Object:", parsedPath);

    const formattedPath = path.format(parsedPath);
    console.log("Formatted Path:", formattedPath);
}
demonstrateParseAndFormat('/path/to/file.txt');

//-----------------------------------------------------------------------
/*6- Write a function that deletes a file.*/

const fs = require('fs');
function deleteFile(filePath) {
    try {
        fs.unlinkSync(filePath);
    } catch (err) {
        //handle errors, but no explicit output.
    }
}
deleteFile('/path/to/file.txt');

//-----------------------------------------------------------------------
/*7- Write a function that creates a folder.*/

const fs = require('fs');
function createFolder(folderPath) {
    try {
        if (!fs.existsSync(folderPath)) 
        { 
            fs.mkdirSync(folderPath);   
        }
    } catch (err) {
        // Error handling (no output required)
    }
}
createFolder('/path/to/newFolder');

//-----------------------------------------------------------------------
/*8- Write a function that creates a custom event and listens for. Trigger the event with a message.*/

const EventEmitter = require('events');
const eventEmitter = new EventEmitter();
function listenForEvent() {
    eventEmitter.on('greet', (message) => {
        console.log(message);
    });
}
function triggerEvent(message) {
    eventEmitter.emit('greet', message);
}
listenForEvent();  
triggerEvent('Hello Event!');

//-----------------------------------------------------------------------
