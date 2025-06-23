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

    static fromJSON(data) {
        return new User({
            email: data.email || "",
            password: data.password || "",
            userType: data.userType || null,
        });
    }

    toString() {
        return `User [id=${this.id}, email=${this.email}, userType=${this.userType}]`;
    }
}