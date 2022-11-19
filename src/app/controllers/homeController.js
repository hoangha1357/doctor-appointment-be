const User = require('../models/User');
const bcryt     = require('bcrypt');
const jwt       = require('jsonwebtoken');
class HomeController {

    register(req,res,next) {
        const { name, username, password, type, pnum, email, address, birthDate } = req.body;
        User.findOne({username: username})
            .then(user => {
                if(user){
                    res.send("User exist");
                }else{
                    const newUser = User.create({
                        name: name,
                        username: username,
                        password: password,
                        type: type,
                        pnum: pnum,
                        email: email,
                        address: address,
                        birthDate: Date(birthDate)
                    })
                    newUser.save()
                     .then(() =>{
                        res.status(201).json({
                            success: true,
                            data: {
                                user: newUser
                            }
                        })
                     })
                     console.log(newUser);
                }
            })
             
    }

    login(req, res, next) {
        User.find({name: req.body.username})
            .then((user)=>{
                if(user.username == req.body.username){
                    if(user.password === req.body.password){
                        res.send("success");
                    }else{
                        res.send("invalid user");
                    }  
                }else{
                    res.send("invalid user");
                }
            })
        next();
    }

    getUsers(req, res, next) {
        User.find({}).lean()
            .then((users)=>{
                res.json(users);
            })
    }
}

module.exports = new HomeController();