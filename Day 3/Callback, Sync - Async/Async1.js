const fs = require("fs");

function print(err, contents){
    console.log(contents);
}

fs.readFile("a.txt", "utf-8", print); //asynchronus


const contents2 = fs.readFileSync("b.txt", "utf-8");  //synchronus
console.log(contents2);