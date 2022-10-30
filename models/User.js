class User {
    constructor(params) {
        this.username = params.username;
        this.mail = params.mail;
        this.password = params.password;
        this.roleId = params.roleId;
        this.createdAt= params.createdAt;
        this.updatedAt= params.updatedAt;
    }
}
module.exports = User;