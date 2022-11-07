const axiosInstance = require("./helpers/axiosInstance");
const { validate, generateToken } = require("./helpers/validateMocks");
const roleMocks = require("./mocks/RoleMocks");

describe('Test of Role model',()=>{
  var token = '';

  beforeEach(async () => {
    const gen = await generateToken();
        if(gen){token = `j%3A%7B%22token%22%3A%22${gen.token}%22%7D`;}
  });
    
    test('adding a role with invalid name should return one error messages in the response',async ()=>{
      const role = roleMocks.badName
        try{
          await axiosInstance.post(`role/add`,role,{headers:{Cookie:`csrf=xxxxxx;token=${token}`}});
        }catch(e){
          validate(e.response.data.error,'name');
        }
    })
})