const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorProfile = new Schema(
    {
        major: [{ type: String }],
        certificate: [{ type: Object }]
    }
);
module.exports = mongoose.model('DoctorProfile', DoctorProfile);
