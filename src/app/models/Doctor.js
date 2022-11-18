const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Doctor = new Schema(
    {
        name: { type: String, maxlength: 250},
        birthDate: { type: Date}
    }
);

module.exports = mongoose.model('Doctor', Doctor);
