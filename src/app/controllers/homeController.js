const User = require('../models/User');

class HomeController {

    async register(req,res,next) {
        const { name, username, password, type, pnum, email, address, birthDate } = req.body;
        try{
            const newUser = await User.create({
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
        }catch{
            return next;
        }
        
        
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