const express = require('express');
const router = express.Router();
const HomeController = require('../app/controllers/homeController');
const UserController = require('../app/controllers/userController');
const DoctorController = require('../app/controllers/doctorController');
const passport = require('passport');
const auth = require('../app/middlewares/auth');

router.get('/', (req, res) => {
    res.send("DR apt api");
});
const passport = require('passport');
const auth = require('./../middleware/auth')

router.get('/', HomeController.getUsers);
router.post('/register', HomeController.register);
router.post(
    '/login', 
    passport.authenticate('local', { session: false, failureMessage: false }),
    HomeController.login
);

//user api
router.get('/user',UserController.getUsers);
router.get('/user/:id',UserController.getUserById);
router.post('/user/:id/update', UserController.updateUser);

//doctor api
router.get('/doctor/search', DoctorController.getDoctorsByName);
router.get('/doctor/search/major', DoctorController.getDoctorsByMajor);
router.post('/doctor/profile', DoctorController.updateProfile);

module.exports = router;