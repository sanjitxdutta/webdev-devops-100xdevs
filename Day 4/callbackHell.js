function getData(dataId, getNextData){
    setTimeout(() => {
        console.log("Data :", dataId);
        if(getNextData){
            getNextData();
        }
    }, 3000);
}

console.log("fetching data1...");
getData(1, () => {
    console.log("fetching data2...");
    getData(2, () => {
        console.log("fetching data3...");
        getData(3, () => {
            console.log("fetching data4...");
            getData(4);
        });
    });
});