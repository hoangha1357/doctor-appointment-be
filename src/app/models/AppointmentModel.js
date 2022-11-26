const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Appointment = new Schema(
    {
        doctor: { type: Schema.Types.ObjectId , ref: 'User' },
        patient: { type: Schema.Types.ObjectId , ref: 'User' },
        date: { type: Date},
        description: { type: String }
    }
);
module.exports = mongoose.model('Appointment', Appointment);
