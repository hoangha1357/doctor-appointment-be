const express = require('express');
const router = express.Router();
const HomeController = require('../app/controllers/homeController');
const UserController = require('../app/controllers/userController');
const passport = require('passport');
const auth = require('./../middleware/auth')

router.get('/', HomeController.getUsers);
router.post('/register', HomeController.register);
router.post(
    '/login', 
    passport.authenticate('local', { session: false, failureMessage: false }),
    HomeController.login
);
router.get('/user',UserController.getUsers);
router.get('/user/:id',UserController.getUserById);
router.post('/user/:id/update', UserController.updateUser)
module.exports = router;