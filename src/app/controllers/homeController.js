const User = require('../models/User');
const bcrypt     = require('bcrypt');
const jwt       = require('jsonwebtoken');
class HomeController {

    register(req,res,next) {
        const { name, username, password, type, pnum, email, address, birthDate } = req.body;
        if( !username || !password || username.length > 30 || password.length > 30){
            res.send("Ivalid info")
        }else{
            User.findOne({username: username})
                .then(user => {
                    if(user){
                        res.send("User exist");
                    }else{
                        const newUser = new User({
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
                    }
                })
        }
             
    }

    login(req, res, next) {
        User.findOne({username: req.body.username})
            .then((user)=>{
                if(user){
                    bcrypt.compare(req.body.password,user.password)
                        .then(result=>{
                            if(result){
                                res.json({
                                    message: "Success",
                                    data: {
                                        user: user
                                    }
                                });
                            }else{
                                res.json({
                                    message: "Fail",
                                });
                            }  
                        })
                }else{
                    res.json({
                        message: "Fail",
                    });
                }
            })
            .catch(err=>console.log(err));
    }

    getUsers(req, res, next) {
        User.find({}).lean()
            .then((users)=>{
                res.json(users);
            })
    }
}

module.exports = new HomeController();