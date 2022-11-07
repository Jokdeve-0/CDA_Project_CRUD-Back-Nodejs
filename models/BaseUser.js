class BaseUser{
    constructor(params){
        this.username = params.username;
        this.mail = params.mail;
        this.password = params.password; 
    }
}

module.exports = BaseUser;