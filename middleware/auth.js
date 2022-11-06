const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try{
    const { token } = req.cookies;
    if(token){
        const decodedToken = jwt.verify(
            token.token,
            'RANDOM_TOKEN_SECRET'
            );
        next();
    }else{
        throw new Error("no authentication token");
    }
    }catch(error){
        return res.status(403).json({error})
    }
}