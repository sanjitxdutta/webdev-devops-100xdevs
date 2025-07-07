const express = require("express");
const app = express();

function isOfAgeMiddleware(req, res, next) {
    const age = req.query.age;
    if (age >= 14) {
        next();
    } else {
        res.json({
            msg: "You are not of age 14 yet!"
        })
    }
}

app.get("/ride1", isOfAgeMiddleware, function (req, res) {
    res.json({
        msg: "You have ridden the ride 1 successfully"
    });
})

app.get("/ride2", isOfAgeMiddleware, function (req, res) {
    res.json({
        msg: "You have ridden the ride 2 successfully"
    });
})

app.listen(3000);