export class User {
    constructor({
        id="",
        firstName="",
        lastName="",
        role = null,
        email = "",
        password = "",
                }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
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