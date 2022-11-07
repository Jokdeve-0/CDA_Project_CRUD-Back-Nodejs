const { validations } = require('../middleware/Validation');

module.exports = (req, res, next) => {
  const validation = validations.checkers(req.body,['username','mail','password']);
  let isValid = true;
  for( const val in validation ){if(validation[val]){isValid = false;}}
  if(!isValid){
    res.status(403);
    res.json({error:validation});
    return res;
  }else{ 
    next();
  }
}
