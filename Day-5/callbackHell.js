// console.log("HI...");
// console.log("Hello....");
// console.log("Hello there....");

setTimeout(() => {
    console.log("HI...");
    setTimeout(() => {
        console.log("Hello....");
        setTimeout(() => {
            console.log("Hello there....");
        }, 3000);
    }, 3000);
}, 1000); 