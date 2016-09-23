"use strict";
var User = (function () {
    function User(id, email, password, firstName, lastName, phone) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map