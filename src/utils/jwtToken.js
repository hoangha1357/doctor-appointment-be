/**
 * Helper function for jwt token
 */

const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const KEY = require('./../const');

exports.signAccessToken = (id) => {
    return jwt.sign({ id }, 'secret-key-for-access_token-abcd', {
        expiresIn: '15m',
    });
};

exports.signRefreshToken = (id) => {
    return jwt.sign({ id }, 'secret-key-for-refresh_token-abc', {
        expiresIn: '90d',
    });
};

exports.verifyRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'secret-key-for-refresh_token-abc', (err, decoded) => {
            if (err) {
                return reject(createError.Unauthorized('Wrong token'));
            }
            resolve(decoded.id);
        });
    });
};