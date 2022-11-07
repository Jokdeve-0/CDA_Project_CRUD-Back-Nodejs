 const editor_id = 1;
 const user_id = 1;
 const wrongEditor_id = 'x';
 const wrongUser_id = 'x';


 exports.editorMemberWithAllInvalid = {
   editor_id: wrongEditor_id,
   user_id: wrongUser_id
 }
 exports.editorMemberWithInvalidEditorId = {
   editor_id: wrongEditor_id,
   user_id: user_id
 }
 exports.editorMemberWithInvalidUserId = {
   editor_id: editor_id,
   user_id: wrongUser_id
 }