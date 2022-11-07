const bcrypt = require('bcrypt');
const mysql = require('mysql');
const handlerCookie = require('../src/helpers/HandlerCookie')
const config = require('../src/_config/config.db');
const log = require('../src/helpers/log');
const BaseQuery = require('../src/scripts/SQL_QUERY/BaseQuery.js');
const { handleError } = require('../src/helpers/handleError');
const { handleResponse } = require('../src/helpers/handleResponse');
const { validations } = require('../middleware/Validation');

// validations
const fieldsControl = {
  user:["username","mail","password"],
  editor:["name","isbn_product","isbn_country","isbn_editor"],
  role:["name"],
  editor_member:["editor_id","user_id"],
  book:["uuid","isbn_article","title","authors","metadata","nav","editor_id"],

}

const connection = mysql.createConnection(config);

// auth
exports.signup = (req, res, next) => {
  const validation = validations.checkers(req.body,['username','mail','password']);
  let isValid = true;
  for( const val in validation ){if(validation[val]){isValid = false;}}
  if(!isValid){
      res.status(403);
      res.json({error:validation});
      return res;
  }else{      
    const baseQuery = BaseQuery.addEntity('user', req.body);
    connection.query(`SELECT * FROM ${baseQuery.table} WHERE ${baseQuery.table}.username='${req.body.username}' OR ${baseQuery.table}.mail='${req.body.mail}';`, (error, existingParams) => {
      if (error) {
        log.writeHistory('signup', [error], 'error');
        return res.status(403).json({
          error: error
        })
      }
      if (existingParams.length != 0) {
        res.status(403).json({
          error: '⚠️ Already existing identifiers ! ⚠️'
        })
      } else {
        bcrypt.hash(req.body.password, 10)
          .then(hash => {
            const baseQuerySignup = BaseQuery.signup('user', req.body, hash);
            connection.query(baseQuerySignup.query, (error, results) => {
              if (error) {
                log.writeHistory('signup', [error], 'error');
                return res.status(403).json({
                  error: error
                })
              }
              log.writeHistory('signup', [results]);
              res.status(200).json({
                results,
                message: '✅ Registered user ! ✅'
              })
            })
          })
          .catch(error => res.status(500).json({
            error: error
          }))
      }
    })
  }
}
exports.login = (req, res, next) => {
  try {
    connection.query(`SELECT * FROM user WHERE mail="${req.body.mail}"`, (error, users) => {
      if (error) {
        log.writeHistory('login', [error], 'error')
        return res.status(403).json({
          error
        })
      } else {
        if (users.length == 0) {
          log.writeHistory('login', [users])
          res.status(403).json({
            error: 'Invalid identifiers'
          })
        }
        bcrypt.compare(req.body.password, users[0].password)
          .then(valid => {
            if (!valid) {
              log.writeHistory('login',[valid],'error')
              res.status(403).json({
                error: 'Invalid identifiers'
              })
            }
            log.writeHistory('login', [users])
            handlerCookie.attachCookieToResponse({
              res,
              user: users[0]
            });

          })
          .catch(error => res.status(500).json({
            error
          }))
      }
    });
  } catch (e) {
    res.status(403).json({error:e})
  }
}
exports.logout = (req, res) => {
  cookie = req.cookies;
  for (var prop in cookie) {
    if (!cookie.hasOwnProperty(prop)) {
      continue;
    }
    const expiredDate = new Date(Date.now() - 9000000);
    res.cookie(prop, '', {
      expires: expiredDate
    });
  }
  const message = {message : 'logout'}
  log.writeHistory('logout',[message]);
  res.status(200).json({message});
}
// base
exports.addEntity = (req, res, next, baseQuery) => {
  const validation = validations.checkers(req.body,fieldsControl[baseQuery.table]);
  let isValid = true;
  for( const val in validation ){if(validation[val]){isValid = false;}}
  if(!isValid){
      res.status(403);
      res.json({error:validation});
      return res;
  }else{
    try {
      connection.query(baseQuery.query, (error, existingParams) => {
        if (error) {
          log.writeHistory('addEntity', [error], 'error');
          return res.status(403).json({
            error
          })
        } else {
          const selectQuery = BaseQuery.selectEntity(baseQuery.table, existingParams.insertId);
          connection.query(selectQuery.query, (error, results) => {
            if (error) {
              log.writeHistory('addEntity', [error], 'error');
              return res.status(403).json({
                error: error
              })
            } else {
              log.writeHistory('addEntity', [results]);
              res.status(200).json({
                results,
                message: '✅ Registered Entity ! ✅'
              })
            }
          })
        }
      })
    } catch (error) {
      log.writeHistory('addEntity', [error], 'error');
      res.status(500).json({
        error,
        message: error.message
      })
    }
  }
}
exports.selectAll = (req, res, next, baseQuery) => {
  connection.query(baseQuery.query, (error, results) => {
    if (error) {
      log.writeHistory('selectAll', [error], 'error');
      return res.status(403).json({error})
    } else {
      // log.writeHistory('selectAll', [results]);
      return handleResponse(results, res, `✅ SELECT * from ${baseQuery.table} !`);
    }
  });
}
exports.selectEntity = (req, res, next, baseQuery) => {
  connection.query(baseQuery.query, (error, results) => {
    if (error) {
      log.writeHistory('selectEntity', [error], 'error');
      return handleError(error, res);
    } else {
      if(baseQuery.table === 'user' ||baseQuery.table === 'editor'){
        const relationQuery = BaseQuery.relationEntity(baseQuery.table,req.body.id);
        connection.query(relationQuery.query, (error, relationResults) => {
          if (error) {
            log.writeHistory('relationEntity', [error], 'error');
            return handleError(error, res);
          } else {
            // log.writeHistory('relationEntity', [results]);
            return handleResponse({results,relationResults}, res, `✅ relation entity ${baseQuery.table} !`);
          }
        });
      }else{
        return handleResponse(results, res, `✅ SELECT ENTITY ${baseQuery.table} !`);
      }
      // log.writeHistory('selectEntity', [results]);
    }
  });
}
exports.relationEntity = (req, res, next, baseQuery) => {
  connection.query(baseQuery.query, (error, results) => {
    if (error) {
      log.writeHistory('relationEntity', [error], 'error');
      return handleError(error, res);
    } else {
      // log.writeHistory('relationEntity', [results]);
      return handleResponse(results, res, `✅ relation entity ${baseQuery.table} !`);
    }
  });
}
exports.editEntity = (req, res, next, baseQuery) => {
  try {
    connection.query(baseQuery.query, (error, results) => {
      if (error) {
        log.writeHistory('editEntity', [error],'error');
        return res.status(403).json({
          error: error.sqlMessage
        })
      } else {
        log.writeHistory('editEntity', [results]);
        res.status(200).json({
          results,
          message: '✅ Updated Entity ! ✅'
        })
      }
    })
  } catch (error) {
    log.writeHistory('editEntity', [error], 'error');
    res.status(500).json({
      error,
      message: error.message
    })
  }
}
exports.deleteEntity = (req, res, next, baseQuery) => {

  try {
    connection.query(baseQuery.query, (error, results) => {
      if (error) {
        log.writeHistory('deleteEntity', [error], 'error');
        return res.status(403).json({
          error: error.sqlMessage
        })
      } else {
        log.writeHistory('delete Entity', [results]);
        res.status(200).json({
          results,
          message: '✅ Deleted Entity ! ✅'
        })
      }
    })
  } catch (error) {
    log.writeHistory('deleteEntity', [error], 'error');
    res.status(500).json({
      error,
      message: error.message
    })
  }
}