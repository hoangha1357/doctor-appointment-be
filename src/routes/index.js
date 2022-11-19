const express = require('express');
const router = express.Router();
const HomeController = require('../app/controllers/homeController')

router.get('/', HomeController.getUsers);
router.post('/resgister', HomeController.register);
router.post('/login', HomeController.login);

module.exports = router;