const moongose = require('mongoose');
const { Schema } = moongose;

const CitaSchema = new Schema({
    title: { type: String, required: true},
    numero: { type: Number, required: true},
    date: { type: Date, default: Date.now },
    description: { type: String, required: true},
    user: { type: String}
});

module.exports = moongose.model('Cita', CitaSchema)