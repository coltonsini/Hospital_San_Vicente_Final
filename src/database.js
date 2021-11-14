const mongoose = require('mongoose');
require('dotenv').config();
const db_ = process.env.DB_url

console.log('base de datos : ', db_);
module.exports = async () => {
    await mongoose.connect(db_, { 
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
})};

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', () => {
    console.log('db logs are connected 🥵🥵🥵🥵🥵🥵');
});
