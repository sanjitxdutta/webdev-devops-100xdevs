function greet(user){
    if(user.ugender === "male" && user.uage>18)
        console.log("Hi Mr. " + user.uname + ", your age is " + user.uage + ", you can vote.");
    else if(user.ugender === "male" && user.uage<18)
        console.log("Hi Mr. " + user.uname + ", your age is " + user.uage + ", you can not vote.");
    else if(user.ugender === "female" && user.uage>18)
        console.log("Hi Ms. " + user.uname + ", your age is " + user.uage + ", you can vote.");
    else if(user.ugender === "female" && user.uage<18)
        console.log("Hi Ms. " + user.uname + ", your age is " + user.uage + ", you can not vote.");
}

let user = {
    uname: "Sanjit",
    uage: 21,
    ugender: "male"
}

greet(user);