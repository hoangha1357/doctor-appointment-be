const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Appointment = new Schema(
    {
        doctor: { type: Schema.Types.ObjectId , ref: 'User' },
        patient: { type: Schema.Types.ObjectId , ref: 'User' },
        date: { type: Date},
        description: { type: String },
        aprove: { type: Boolean },
    }
);
module.exports = mongoose.model('Appointment', Appointment);
