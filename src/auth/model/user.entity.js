export class User {
    constructor({
        id="",
        email = "",
        password = "",
        userType = null,
                }) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.userType = userType;
    }
}