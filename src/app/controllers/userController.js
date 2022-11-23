const User = require('../models/User');

class UserController {

    getUsers(req, res, next) {
        User.find({}).lean()
            .then((users)=>{
                res.json(users);
            })
    }

    getUserById(req, res, next) {
        User.findOne({_id: req.params.id})
            .then(user=>{
                res.json({
                    name: user.name,
                    type: user.type,
                    pnum: user.pnum,
                    email: user.email,
                    address: user.address,
                    birthDate: user.birthDate
                });
            }).catch(next)
    }

    updateUser(req, res, next) {
        User.findOneAndUpdate({_id: req.params.id}, {$set: {name: req.body.name, pnum: req.body.pnum, email: req.body.email, address: req.body.address, birthDate: Date(req.body.birthDate)}})
            .then(()=>{
                res.json({
                    message: "update success"
                })
            })
            .catch(err => {
                res.json({
                    message: "update fail"
                })
                console.log(err)
            })
    }
}

module.exports = new UserController();