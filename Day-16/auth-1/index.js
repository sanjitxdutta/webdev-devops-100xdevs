const express = require("express");

const app = express();

const users = [];

function generateToken() {
    let options = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 32; i++) {
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}

app.use(express.json());

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
        const token = generateToken();
        user.token = token;
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

app.get("/me", function (req, res){
    let token = req.headers.token;
    let user = users.find(user => user.token === token);
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