// Create a JavaScript file to act as a Node.js program named streams.js. 
// This program should read a file things.json and output to a file things_caps.json. 
// Use the second command-line argument to declare the destination. 
// You will not need to make your own Readable for this exercise. 
// Simply use fs.createReadStream instead. 
// In between, all letters should be capitalized with your own Transform stream. 
// Then the data should be passed to your own Writable stream. 
// The fs.appendFile will be helpful for this task.

"use strict"

const { Transform, Writable } = require("stream");

const fs = require("fs");

const makeUpperCase = Transform();
const writeStream = Writable();

// This function (that has the _transform method on it) takes whatever it is given (in this case, json), 
// converts the buffer (the chunks of information it gets) to a string and makes it all uppercase
makeUpperCase._transform = (buffer, _, callback) => {
  callback(null, buffer.toString().toUpperCase());
};

// This function writes what has been transformed to the file (things_caps.json)
writeStream._write = (buffer, _, next) => {
    
  fs.writeFile('things_caps.json', buffer, (err) => {
    if (err) throw err;
    console.log("Added to file. Check things_caps.json to see!");
  });
  next();
};

// Pipe, here, is what is handling the transactions 
fs.createReadStream("things.json").pipe(makeUpperCase).pipe(writeStream);