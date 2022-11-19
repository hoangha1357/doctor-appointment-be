const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        name: { type: String, maxlength: 250},
        username: { type: String, maxlength:30,unique: true},
        password: { type: String, maxlength:30},
        type: { type: String},
        pnum: { type: Number, maxlength: 11, numbers: true},
        email: { type: String, email: true},
        address: { type: String},
        birthDate: { type: Date}
    }
);

User.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    // hash the password with bcrypt
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model('User', User);
