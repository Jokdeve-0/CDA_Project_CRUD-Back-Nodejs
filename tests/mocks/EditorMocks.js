const name = 'Publishers';
const isbn_product = 123;
const isbn_country = 12;
const isbn_editor = 12345;
const wrongName = '>Publishers<';
const wrongIsbn_product = 1;
const wrongIsbn_country = 1;
const wrongIsbn_editor = 1;

exports.editorWithAllInvalid = {
  name: wrongName,
  isbn_product: wrongIsbn_product,
  isbn_country: wrongIsbn_country,
  isbn_editor: wrongIsbn_editor

}
exports.editorWithInvalidName = {
  name: wrongName,
  isbn_product: isbn_product,
  isbn_country: isbn_country,
  isbn_editor: isbn_editor

}
exports.editorWithInvalidProduct = {
  name: name,
  isbn_product: wrongIsbn_product,
  isbn_country: isbn_country,
  isbn_editor: isbn_editor

}
exports.editorWithInvalidCountry = {
  name: name,
  isbn_product: isbn_product,
  isbn_country: wrongIsbn_country,
  isbn_editor: isbn_editor

}
exports.editorWithInvalidEditor = {
  name: name,
  isbn_product: isbn_product,
  isbn_country: isbn_country,
  isbn_editor: wrongIsbn_editor

}