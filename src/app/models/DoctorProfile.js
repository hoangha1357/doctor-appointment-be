const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorProfile = new Schema(
    {
        doctorId: { type: Schema.Types.ObjectId , ref: 'User' },
        major: [{ type: String }],
        certificate: [{ type: Object }]
    }
);
module.exports = mongoose.model('DoctorProfile', DoctorProfile);
