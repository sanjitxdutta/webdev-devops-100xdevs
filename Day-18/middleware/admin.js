const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

function adminMiddleware(req, res, next){
    const token = req.headers.token;
    const decodedInfo = jwt.verify(token, process.env.JWT_SECRET_ADMIN);

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
    adminMiddleware : adminMiddleware
}