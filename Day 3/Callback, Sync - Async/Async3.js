function timeout(){
    console.log("Click the button!");  //4 Cause the thread is not free so it will add on the queue and when the thread is free it will execute
}

console.log("Hi!");  //1

setTimeout(timeout, 1000);

console.log("Welcome to loupe.");  //2

let c = 0;
//3-4s
for(let i=0; i<10000000000; i++){
    c++;
}

console.log("Expansive operation done!"); //3