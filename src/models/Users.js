const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    pass: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

UserSchema.methods.matchPassword = function(pass) {
    return bcrypt.compare(pass, this.pass);
}

module.exports = mongoose.model('User', UserSchema);