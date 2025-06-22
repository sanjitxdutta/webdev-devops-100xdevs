function getData(dataId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Data :", dataId);
            resolve("success");
        }, 3000);
    });
}

(async function (){
    console.log("fetching data 1...");
    await getData(1);
    console.log("fetching data 2...");
    await getData(2);
    console.log("fetching data 3...");
    await getData(3);
})();

// async function getD(){
//     console.log("fetching data 1...");
//     await getData(1);
//     console.log("fetching data 2...");
//     await getData(2);
//     console.log("fetching data 3...");
//     await getData(3);
// }

// getD();