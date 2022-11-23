const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt     = require('bcryptjs');

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
User.methods.checkPassword = async function (providedPassword) {
    return await bcrypt.compare(providedPassword, this.password);
};

User.methods.genResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.resetPasswordToken = resetToken;
    this.resetPasswordExpires = Date.now() + 3600000; // 15 minutes

    return resetToken;
};

module.exports = mongoose.model('User', User);
