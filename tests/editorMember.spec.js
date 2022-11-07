const axiosInstance = require("./helpers/axiosInstance");
const {
  validate,
  generateToken
} = require("./helpers/validateMocks");
const editorMemberMocks = require("./mocks/EditorMemberMocks");

const request = async (editor, token) => {
  await axiosInstance.post(`editorMember/add`, editor, {
    headers: {
      Cookie: `csrf=xxxxxx;token=${token}`
    }
  })
};

describe('Test of EditorMember model', () => {

  var token = '';

  beforeEach(async () => {
    const gen = await generateToken();
    if (gen) {
      token = `j%3A%7B%22token%22%3A%22${gen.token}%22%7D`;
    }
  });

  test('adding a editorMember with invalid editor id should return one error messages in the response', async () => {
    const editorMember = editorMemberMocks.editorMemberWithInvalidEditorId;
    try {
      await request(editorMember, token);
    } catch (e) {
      // console.log(e.response.data.error);
      validate(e.response.data.error, 'editor_id');
    }
  })
  test('adding a editorMember with invalid user id should return one error message in the response', async () => {
    const editorMember = editorMemberMocks.editorMemberWithInvalidUserId;
    try {
      await request(editorMember, token);
    } catch (e) {
      // console.log(e.response.data.error);
      validate(e.response.data.error, 'user_id');
    }

  })
  test('adding a editorMember with invalid entries should return one error message in the response', async () => {
    const editorMember = editorMemberMocks.editorMemberWithAllInvalid;
    try {
      await request(editorMember, token);
    } catch (e) {
      // console.log(e.response.data.error);
      expect(typeof (e.response.data.error['editor_id'])).toBe("string");
      expect(typeof (e.response.data.error['user_id'])).toBe("string");
    }

  })
})