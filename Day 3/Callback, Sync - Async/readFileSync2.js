const fs = require("fs");

const contents1 = fs.readFileSync("a.txt", "utf-8"); //synchronus
console.log(contents1);

const contents2 = fs.readFileSync("b.txt", "utf-8");  //synchronus
console.log(contents2);