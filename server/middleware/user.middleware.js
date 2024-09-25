const jwt = require("jsonwebtoken")

const verifyToken = async(req, res, next) =>{
    let token;
    let authHeader = await req.headers.Authorization || req.headers.authorization

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        if(!token){
            return res.status(404).json({error:"Token not found"})
        }
        else{
            const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.body = verifiedToken;
            return res.status(200).json(req.body)
        }
    }
    else{
        return res.status(403).json({message:"Invalid header structure"})
    }
}

module.exports = verifyToken;


