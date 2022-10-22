const fs = require('fs');
class Log {
  constructor() {
    this.SQL_file = `${process.env.ROOT_DIR}/scripts/.cache/SQL.log`;
    this.errors_file = `${process.env.ROOT_DIR}/scripts/.cache/errors.log`;
  }

  response(actionSQL, message) {
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    var results = '';
    message.forEach(element => {
        results += `${JSON.stringify(element)}\n`;
    });
    return ` 
${actionSQL}
${new Date(Date.now()).toLocaleDateString('fr-FR',options)} 
${results} 
`;
  }

  writeSQL(actionSQL, response, messageType) {
      fs.writeFile(messageType === 'error' ? this.errors_file : this.SQL_file,
        this.response(actionSQL, response), {flag: 'a+'},
        function (error) {
          if (error) {
            console.log(`ERROR 🛑 writing log : ${JSON.stringify(error, null, 4)}`);
          }
        }
        );
        console.log(messageType === 'error' ? `🛑 Error : ${response[0].message}` : "💾" + " new log");
  }

  c(file,line,message,variable){
    console.log(`File : ${file}, Line : ${line},${console.table(message)}\nDEF: ${variable}`)
  }

}
const log = new Log();
module.exports = log;