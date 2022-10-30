const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log("1",req.headers.authorization);
    try{
    const headerYoken  = req.headers.authorization;
    if(headerYoken){
        const token = headerYoken.split(' ')[1];
        console.log("2",token);
        const decodedToken = jwt.verify(
            token,
            'RANDOM_TOKEN_SECRET'
            );
        console.log("3",decodedToken);
        next();
    }else{
        throw new Error("no authentication token");
    }
    }catch(error){
        console.log(error)
        return res.status(403).json({error})
    }
}