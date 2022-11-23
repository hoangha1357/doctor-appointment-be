const express = require('express');
const router = express.Router();
const HomeController = require('../app/controllers/homeController');
const UserController = require('../app/controllers/userController');

router.get('/', (req, res) => {
    res.send("doctor-appointment-api")
});
router.post('/resgister', HomeController.register);
router.post('/login', HomeController.login);
router.get('/user',UserController.getUsers);
router.get('/user/:id',UserController.getUserById);
router.post('/user/:id/update', UserController.updateUser)
module.exports = router;