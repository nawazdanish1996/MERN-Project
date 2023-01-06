require('dotenv').config();
const jwt = require("jsonwebtoken");
// collection schema
const RegForm = require("../modelSchema");


const auth = async (req, resp, next)=>{
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verifyUser);
        
        const user = await RegForm.findOne({_id: verifyUser._id})
        console.log(user.name);

        next();
    } catch (error) {
        resp.status(401).send(error);
    }
}

module.exports = auth;