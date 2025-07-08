const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const JWT_SECRET = "sandom@123";

const users = [];

app.use(express.json());

app.get("/", function (req, res){
    res.sendFile(__dirname + "/public/index.html");
})

app.post("/signup", function (req, res) {
    const { username, password } = req.body;

    if (users.find(user => user.username === username)) {
        res.json({
            msg: "You already signedup"
        })
        return
    }

    users.push({
        username: username,
        password: password
    })

    res.json({
        msg: "You have signed in."
    })
    console.log(users);
})

app.post("/signin", function (req, res) {
    const { username, password } = req.body;

    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
        const token = jwt.sign({
            username: username
        }, JWT_SECRET);
        res.json({
            token: token
        })
    } else {
        res.status(404).send({
            msg: "Invalid username or password."
        })
    }
    console.log(users);
})

function auth(req, res, next){
    let  token = req.headers.token;
    const decodedInfo = jwt.verify(token, JWT_SECRET);
    if(decodedInfo.username){
        req.username = decodedInfo.username; 
        next();
    } else {
        msg: "You are not Logged."
    }
}

app.get("/me", auth, function (req, res){
    let user = users.find(user => user.username === req.username);
    if(user){
        res.json({
            username: user.username,
            password: user.password
        })
    } else {
        res.status(404).send({
            msg: "Invalid token!"
        })
    }
})

app.listen(3000);