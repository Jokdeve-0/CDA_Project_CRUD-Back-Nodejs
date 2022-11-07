const username = 'James';
const mail = 'james@bond.fr';
const password = 'Aa@1Aa@1';
const wrongUsername = 'james.';
const wrongMail = 'james.bond';
const wrongPassword = '$$$$$$';

exports.badUsername = {
  username: wrongUsername,
  mail: mail,
  password: password
}

exports.badMail = {
  username: username,
  mail: wrongMail,
  password: password
}

exports.badPassword = {
  username: username,
  mail: mail,
  password: wrongPassword
}

exports.badUser = {
  username: wrongUsername,
  mail: wrongMail,
  password: wrongPassword
}