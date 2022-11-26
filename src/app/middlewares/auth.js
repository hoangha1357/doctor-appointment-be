const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/User');
const createError = require('http-errors');


// config for passport-local
const localConfig = {
    usernameField: 'username',
    passwordField: 'password',
};

// jwt local for authenticate users
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

// config for passport-jwt
const jwtConfig = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: 'secret-key-for-access_token-abcd',
};


passport.use(
    new JWTStrategy(jwtConfig, async (payload, done) => {
        try{
            const user = await User.findById(payload.id);
            done(null, user)
        }catch(err){
            console.log(err)
            done(err, false)
        }
    })
)

// authorize user
exports.Authorization = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) {
            return next(createError.Unauthorized(info?.message ? info.message : "User is not authorized"));
        } else {
            req.user = user;
            next();
        }
    })(req, res, next);
}


exports.AuthorizationDoctor = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) {
            return next(createError.Unauthorized(info?.message ? info.message : "User is not authorized"));
        } else if (user.type != "Doctor") {
            return next(createError.Unauthorized(info?.message ? info.message : "You are not the doctor"));
        } else {
            req.user = user;
            next();
        }
    })(req, res, next);
}


