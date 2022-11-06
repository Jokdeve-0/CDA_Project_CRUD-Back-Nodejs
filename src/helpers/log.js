const fs = require('fs');
class Log {
  constructor() {
    this.SQL_file = `${process.env.ROOT_DIR}/scripts/.cache/SQL.log`;
    this.errors_file = `${process.env.ROOT_DIR}/scripts/.cache/errors.log`;
  }

  response(actionDone, result) {
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    var results = '';
    result.forEach(element => {
        results += `${JSON.stringify(element)}\n`;
    });
    return ` 
${actionDone}
${new Date(Date.now()).toLocaleDateString('fr-FR',options)} 
${results} 
`;
  }

  writeHistory(actionDone, result, messageType) {
      fs.writeFile(messageType === 'error' ? this.errors_file : this.SQL_file,
        this.response(actionDone, result), {flag: 'a+'},
        function (error) {
          if (error) {
            console.log(`ERROR 🛑 writing log : ${JSON.stringify(error, null, 4)}`);
          }
        }
        );
        console.log(messageType === 'error' ? `🛑 Error : ${result[0].message}` : `${actionDone} is a success`);
  }

  c(file,line,message,variable){
    console.log(`File : ${file}, Line : ${line},${console.table(message)}\nDEF: ${variable}`)
  }

}
const log = new Log();
module.exports = log;