const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    const authHeader = req.get('Authorization');
    if(!authHeader){//should no acces for
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1]; //Bearer token split
    if(!token || token == ''){
        req.isAuth = false;
        return next();
    }
    let decodedToken;
    try{
        decodedToken = jwt.verify(token,'somesupersecretkey');
    }catch(err){
        req.isAuth = false;
        return next();
    }
    if(!decodedToken){//is really set?
        req.isAuth = false;
        return next();
    }
    
    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();



}