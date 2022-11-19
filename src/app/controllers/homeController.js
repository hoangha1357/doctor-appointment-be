const User = require('../models/User');

class HomeController {

    register(req,res,next) {
        const newUser = new User(...req.body);
        newUser.save();
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