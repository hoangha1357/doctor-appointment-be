const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const createError = require('http-errors');
const localConfig = {
    usernameField: 'username',
    passwordField: 'password',
};

passport.use(
    new LocalStrategy(localConfig, async (username, password, done) => {
        try {
            if (!username || !password) {
                done(createError.BadRequest('Username and password are required'));
            }
            const user = await User.findOne({ username }).select('+password');
            if (!user) {
                done(createError.Unauthorized('Invalid username'));
            }
            const isValid = await user.checkPassword(password);
            if (!isValid) {
                done(createError.Unauthorized('Wrong password'));
            }

            // success case
            done(null, user);
        } catch (err) {
            done(err, false);
        }
    })
);


