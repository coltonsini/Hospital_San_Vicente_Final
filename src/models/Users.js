// const mongoose = require('mongoose');
// const { Schema } = mongoose;
// const bcrypt = require('bcryptjs');

// const UserSchema = new Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     pass: { type: String, required: true },
//     date: { type: Date, default: Date.now },
// });

// UserSchema.methods.encryptPassword = async(pass) => {
//     const salt = await bcrypt.genSalt(10);
//     const hash = bcrypt.hash(pass, salt);
//     return hash;
// }

// UserSchema.methods.matchPassword = async function(password) {
//     return await bcrypt.compare(pass, this.password);
// }

// UserSchema.methods.validateEmail = (email) => {
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }

// module.exports = mongoose.model('User', UserSchema);\


const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    pass: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

UserSchema.methods.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
}

UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(pass, this.password);
}

module.exports = mongoose.model('User', UserSchema);