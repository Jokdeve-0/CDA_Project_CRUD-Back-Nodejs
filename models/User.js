class User {

    constructor(
        username, mail, password, roleId, createdAt, updatedAt
    ) {
        this.username = username;
        this.mail = mail;
        this.password =password;
        this.roleId =roleId;
        this.createdAt=createdAt;
        this.updatedAt=updatedAt;
    }
}
module.exports = User;