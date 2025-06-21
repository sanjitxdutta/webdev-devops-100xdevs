
const fs = require("fs");

function readTheFile(sendTheFinalValueHere) {
    // do ur thing, whwnever u have the final value, call sendTheFinalValueHere("finalValue");
    fs.readFile("a.txt", "utf-8", function (err, data) {
        sendTheFinalValueHere(data);
    })
}

function readFile(filename) {
    // read the file and return it's value
    return new Promise(readTheFile);
}

const p = readFile("a.txt");

function callback(contents) {
    console.log(contents);
}

p.then(callback);