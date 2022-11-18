const express = require('express');
const router = express.Router();
const Doctor = require('../app/models/Doctor');

router.get('/', function(req, res) {
    Doctor.find({}).lean()
        .then((doctors)=>{
            res.json(doctors);
        })
})

module.exports = router;