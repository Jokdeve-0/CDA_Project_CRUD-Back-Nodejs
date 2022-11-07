const jwt = require('jsonwebtoken')

exports.validate = (response,checkpoint)=>{
    for(const key in response){
        if(key === checkpoint){
            expect(typeof(response[key])).toBe('string');
        }else{
            expect(response[key]).toBe(false);
        }
    }
}
exports.generateToken = async () => {
  return {
      token: jwt.sign({
          id: 1,
          role: 1
      }, "RANDOM_TOKEN_SECRET", {
          expiresIn: '24h'
      })
  };
}