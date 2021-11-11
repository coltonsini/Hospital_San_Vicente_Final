const bcrypt = require('bcryptjs');

const matchPassword = function(password) {
    return bcrypt.compare(password, this.password);
}

module.exports = matchPassword;