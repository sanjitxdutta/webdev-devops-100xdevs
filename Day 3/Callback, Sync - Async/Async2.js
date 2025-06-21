const fs = require("fs");

function print(err, contents){
    if(err){ 
        console.log(err);
    } else {
        console.log(contents);
    }
}

fs.readFile("a.txt", "utf-8", print); //asynchronus  //call back print

fs.readFile("b.txt", "utf-8", print); //asynchronus  //call back print0

console.log("Done!");