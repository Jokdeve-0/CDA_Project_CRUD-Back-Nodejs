const axiosInstance = require("./helpers/axiosInstance");
const {
  validate,
  generateToken
} = require("./helpers/validateMocks");
const bookMocks = require("./mocks/BooksMocks");

const request = async (editor, token) => {
  await axiosInstance.post(`book/add`, editor, {
    headers: {
      Cookie: `csrf=xxxxxx;token=${token}`
    }
  })
};

describe('Test of book model', () => {

  var token = '';

  beforeEach(async () => {
    const gen = await generateToken();
    if (gen) {
      token = `j%3A%7B%22token%22%3A%22${gen.token}%22%7D`;
    }
  });
    
    test('adding a book with invalid UUID should return one error message in the response',async ()=>{
        const book = bookMocks.bookWithInvalidUuid;
        try {
          await request(book, token);
        } catch (e) {
          console.log(e);
          validate(e.response.data.error, 'uuid');
        }
        
    })

    test('adding a book with invalid ISBN Article should return one error message in the response',async ()=>{
        const book = bookMocks.bookWithInvalidArticle;
        try {
          await request(book, token);
        } catch (e) {
          // console.log(e.response.data.error);
          validate(e.response.data.error, 'isbn_article');
        }
        
    })

    test('adding a book with invalid title should return one error message in the response',async ()=>{
        const book = bookMocks.bookWithInvalidTitle;
        try {
          await request(book, token);
        } catch (e) {
          // console.log(e.response.data.error);
          validate(e.response.data.error, 'title');
        }
        
    })

    test('adding a book with invalid authors should return one error message in the response',async ()=>{
        const book = bookMocks.bookWithInvalidAuthors;
        try {
          await request(book, token);
        } catch (e) {
          // console.log(e.response.data.error);
          validate(e.response.data.error, 'authors');
        }
        
    })

    test('adding a book with invalid metadata should return one error message in the response',async ()=>{
        const book = bookMocks.bookWithInvalidMetadata;
        try {
          await request(book, token);
        } catch (e) {
          // console.log(e.response.data.error);
          validate(e.response.data.error, 'metadata');
        }
        
    })

    
    test('adding a book with valid nav should return one error message in the response',async ()=>{
        const book = bookMocks.bookWithInvalidNav;
        try {
          await request(book, token);
        } catch (e) {
          // console.log(e.response.data.error);
          validate(e.response.data.error, 'nav');
        }
        
    })

    
    test('adding a book with valid editor Id should return one error message in the response',async ()=>{
        const book = bookMocks.bookWithInvalidEditor;
        try {
          await request(book, token);
        } catch (e) {
          // console.log(e.response.data.error);
          validate(e.response.data.error, 'editor_id');
        }
        
    })

    test('adding a book with invalid entries should return one error message in the response',async ()=>{
      const book = bookMocks.bookWithAllInvalid;
      try {
        await request(book, token);
      } catch (e) {
        // console.log(e.response.data.error);
        expect(typeof(e.response.data.error.isbn_article)).toBe("string");
        expect(typeof(e.response.data.error.uuid)).toBe("string");
        expect(typeof(e.response.data.error.authors)).toBe("string");
        expect(typeof(e.response.data.error.title)).toBe("string");
        expect(typeof(e.response.data.error.nav)).toBe("string");
        expect(typeof(e.response.data.error.metadata)).toBe("string");
      }
      
  })
})