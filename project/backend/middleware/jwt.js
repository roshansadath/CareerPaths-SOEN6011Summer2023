const jwt=require('jsonwebtoken');
require('dotenv').config();

const secretKey=process.env.SECRET_KEY;

module.exports.generateToken=(userId)=>{
    const payload={ userId };
    const token=jwt.sign(payload,secretKey,{expiresIn:'1h'});
    return token;
};

module.exports.authenticateToken=(req,res,next)=>{
    const authHeader=req.headers.authorization;

    if(authHeader){
        const token=authHeader.split(' ')[1];
        
        jwt.verify(token,secretKey,(err,decoded)=>{
            if(err){
                return res.sendStatus(403);
            }

            req.user=decoded;
            
            next();
        })
    }else{
        res.sendStatus(401);
    }
};

