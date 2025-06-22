const fs = require("fs");

function readFilePromisified(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if(err) reject(err);
            else resolve(data);
        });
    });
}

readFilePromisified("a.txt").then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
});