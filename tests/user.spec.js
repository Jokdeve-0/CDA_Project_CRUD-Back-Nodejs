const axiosInstance = require("./helpers/axiosInstance");
const { validate } = require("./helpers/validateMocks");
const userMocks = require("./mocks/UserMocks");

describe('Test of User model',()=>{
    
    test('adding a user with invalid username should return one error message in the response',async ()=>{
      const user  = userMocks.badUsername;
      try{
        await axiosInstance.post(`auth/signup`,user,{headers:{Cookie:'csrf=xxxxxx' }});
      }catch(e){
        validate(e.response.data.error,'username');
      }

    })
    test('adding a user with invalid mail should return one error message in the response',async ()=>{
      const user  = userMocks.badMail;
      try{
        await axiosInstance.post(`auth/signup`,user,{headers:{Cookie:'csrf=xxxxxx' }});
      }catch(e){
        validate(e.response.data.error,'mail');
      }
    })
    test('adding a user with invalid password should return one error message in the response',async ()=>{
      const user  = userMocks.badPassword;
      try{
        await axiosInstance.post(`auth/signup`,user,{headers:{Cookie:'csrf=xxxxxx' }});
      }catch(e){
        validate(e.response.data.error,'password');
      }
    })
    test('adding a user with invalid entries should return four error messages in the response',async ()=>{
      const user  = userMocks.badUser;
      try{
        await axiosInstance.post(`auth/signup`,user,{headers:{Cookie:'csrf=xxxxxx' }});
      }catch(e){
        expect(typeof(e.response.data.error.username)).toBe('string');
        expect(typeof(e.response.data.error.mail)).toBe('string');
        expect(typeof(e.response.data.error.password)).toBe('string');
      }
    })
})