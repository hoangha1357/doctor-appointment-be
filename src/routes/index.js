const express = require('express');
const router = express.Router();
const HomeController = require('../app/controllers/homeController');
const UserController = require('../app/controllers/userController');
const AppointmentController = require('../app/controllers/appointmentController');
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
router.post('/appointment/create', auth.Authorization , AppointmentController.appointment)
router.patch('/appointment/:id', auth.Authorization , AppointmentController.editAppointment)
router.delete('/appointment/:id', auth.Authorization , AppointmentController.cancelAppointment)
router.get('/appointment/getAppointment', auth.Authorization, AppointmentController.getAllAppointment)
module.exports = router;

/*
    passport: local(username, password), 
    single sign on: facebook, google
 */