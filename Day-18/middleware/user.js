const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

function userMiddleware(req, res, next){
    const token = req.headers.token;
    const decodedInfo = jwt.verify(token, process.env.JWT_SECRET_USER);

    if(decodedInfo){
        req.userId = decodedInfo.id;
        next();
    } else {
        req.status(403).json({
            message: "You are not signed in."
        })
    }
}

module.exports = {
    userMiddleware : userMiddleware
}