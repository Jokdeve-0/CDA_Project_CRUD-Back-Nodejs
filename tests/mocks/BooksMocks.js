const uuid = 1234567;
const isbn_article = 1234567;
const title = 'SuperTilte';
const authors = 'authorOne, authorTwo';
const metadata = JSON.stringify({
  pages: 250
});
const nav = JSON.stringify({
  chapitres: 23
});
const editor_id = 1;
const wrongUuid = 'x';
const wrongIsbn_article = 'x';
const wrongTitle = '>SuperTilte<';
const wrongAuthors = '>authorOne, authorTwo<';
const wrongMetadata = 'x';
const wrongNav = 'x';
const wrongEditor_id = 'x';

exports.bookWithAllValid = {

  uuid: uuid,
  isbn_article: isbn_article,
  title: title,
  authors: authors,
  metadata: metadata,
  nav: nav,
  editor_id: editor_id

}
exports.bookWithAllInvalid = {

  uuid: wrongUuid,
  isbn_article: wrongIsbn_article,
  title: wrongTitle,
  authors: wrongAuthors,
  metadata: wrongMetadata,
  nav: wrongNav,
  editor_id: wrongEditor_id

}
exports.bookWithInvalidUuid = {

  uuid: wrongUuid,
  isbn_article: isbn_article,
  title: title,
  authors: authors,
  metadata: metadata,
  nav: nav,
  editor_id: editor_id

}
exports.bookWithInvalidArticle = {

  uuid: uuid,
  isbn_article: wrongIsbn_article,
  title: title,
  authors: authors,
  metadata: metadata,
  nav: nav,
  editor_id: editor_id

}
exports.bookWithInvalidTitle = {

  uuid: uuid,
  isbn_article: isbn_article,
  title: wrongTitle,
  authors: authors,
  metadata: metadata,
  nav: nav,
  editor_id: editor_id

}
exports.bookWithInvalidAuthors = {

  uuid: uuid,
  isbn_article: isbn_article,
  title: title,
  authors: wrongAuthors,
  metadata: metadata,
  nav: nav,
  editor_id: editor_id

}
exports.bookWithInvalidMetadata = {

  uuid: uuid,
  isbn_article: isbn_article,
  title: title,
  authors: authors,
  metadata: wrongMetadata,
  nav: nav,
  editor_id: editor_id

}
exports.bookWithInvalidNav = {

  uuid: uuid,
  isbn_article: isbn_article,
  title: title,
  authors: authors,
  metadata: metadata,
  nav: wrongNav,
  editor_id: editor_id

}
exports.bookWithInvalidEditor = {

  uuid: uuid,
  isbn_article: isbn_article,
  title: title,
  authors: authors,
  metadata: metadata,
  nav: nav,
  editor_id: wrongEditor_id

}