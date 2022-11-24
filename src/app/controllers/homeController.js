const User = require('../models/User');
const bcrypt     = require('bcrypt');
const jwt       = require('jsonwebtoken');
const {signAccessToken, signRefreshToken, verifyRefreshToken} = require('../../utils/jwtToken')
const createError = require('http-errors');
class HomeController {

    register = (req,res,next) => {
        const { name, username, password, type, pnum, email, address, birthDate } = req.body;
        if( !username || !password || username.length > 30 || password.length > 30 || !type){
            res.json({message:"Ivalid info"})
        }else{
            User.findOne({username: username})
                .then(user => {
                    if(user){
                        res.json({message:"User exist"});
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

    login = (req, res, next) => {
        console.log('login: ' + req.user)
        try {
            const accessToken = signAccessToken(req.user.id);
            const refreshToken = signRefreshToken(req.user._id);

            res.status(200).json({
                success: true,
                accessToken,
                refreshToken
            });
        } catch (error) {
            console.log(error)
            return next(createError.InternalServerError('Server error'))
        }

    }

}

module.exports = new HomeController();