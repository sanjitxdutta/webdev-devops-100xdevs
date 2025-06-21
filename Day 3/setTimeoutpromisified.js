function setTimeoutpromisified(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function callback(){
    console.log("3 seconds have passed");
}

setTimeoutpromisified(3000).then(callback) //promisified version
setTimeout(callback, 3000); //callback version