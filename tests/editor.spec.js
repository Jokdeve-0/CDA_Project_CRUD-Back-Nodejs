const axiosInstance = require("./helpers/axiosInstance");
const {
  validate,
  generateToken
} = require("./helpers/validateMocks");
const editorMocks = require("./mocks/EditorMocks");

const request = async (editor, token) => {
  await axiosInstance.post(`editor/add`, editor, {
    headers: {
      Cookie: `csrf=xxxxxx;token=${token}`
    }
  })
};

describe('Test of Editor model', () => {

  var token = '';

  beforeEach(async () => {
    const gen = await generateToken();
    if (gen) {
      token = `j%3A%7B%22token%22%3A%22${gen.token}%22%7D`;
    }
  });

  test('adding a editor with invalid name should return one error messages in the response', async () => {
    const editor = editorMocks.editorWithInvalidName;
    try {
      await request(editor, token);
    } catch (e) {
      // console.log(e.response.data.error);
      validate(e.response.data.error, 'name');
    }
  })

  test('adding a editor with invalid ISBN Product should return one error messages in the response', async () => {
    const editor = editorMocks.editorWithInvalidProduct;
    try {
      await request(editor, token);
    } catch (e) {
      // console.log(e.response.data.error);
      validate(e.response.data.error, 'isbn_product');
    }
  })

  test('adding a editor with invalid ISBN Country should return one error messages in the response', async () => {
    const editor = editorMocks.editorWithInvalidCountry;
    try {
      await request(editor, token);
    } catch (e) {
      // console.log(e.response.data.error);
      validate(e.response.data.error, 'isbn_country');
    }
  })

  test('adding a editor with invalid ISBN Editor should return one error messages in the response', async () => {
    const editor = editorMocks.editorWithInvalidEditor
    try {
      await request(editor, token);
    } catch (e) {
      // console.log(e.response.data.error);
      validate(e.response.data.error, 'isbn_editor');
    }
  })

  test('adding a editor with invalid entries should return one error messages in the response', async () => {
    const editor = editorMocks.editorWithAllInvalid;
    try {
      await request(editor, token);
    } catch (e) {
      // console.log(e.response.data.error);
      expect(typeof (e.response.data.error['name'])).toBe('string');
      expect(typeof (e.response.data.error['isbn_product'])).toBe('string');
      expect(typeof (e.response.data.error['isbn_country'])).toBe('string');
      expect(typeof (e.response.data.error['isbn_editor'])).toBe('string');
    }
  })


})