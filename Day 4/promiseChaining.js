function getData(dataId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Data :", dataId);
            resolve("success");
        }, 3000);
    });
}

getData(1).then((res) => {
    return getData(2).then(
        (res) => {
            return getData(3);
        }).then((res) => {
            console.log(res);
        })
})

// console.log("fetching data 1...");
// getData(1).then((res) => {
//     console.log("fetching data 2...");
//     getData(2).then((res) => {
//         console.log("fetching data 3...");
//         getData(3).then((res));
//     });
// });
