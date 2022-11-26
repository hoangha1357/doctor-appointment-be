const User = require('../models/User');
const DoctorProfile = require('../models/DoctorProfile');
class UserController {

    getUsers(req, res, next) {
        User.find({}).lean()
            .then((users)=>{
                res.json(users);
            })
    }

    getUserById = (req, res, next) => {
        User.findOne({_id: req.params.id})
            .then(async (user) => {
                let resObj = {
                    name: user.name,
                    type: user.type,
                    pnum: user.pnum,
                    email: user.email,
                    address: user.address,
                    birthDate: user.birthDate
                };
                if(user?.type == "Doctor"){
                    const profile = await DoctorProfile.findOne({doctorId: user._id});
                    resObj = {
                        ...resObj,
                        major: profile.major,
                        certificate: profile.certificate
                    };
                }
                res.status(200).json(resObj);
                
            }).catch(err =>{
                res.json({
                    message: "User not found"
                });
                console.log(err);
            })
    }

    updateUser = (req, res, next) => {
        User.findOneAndUpdate({_id: req.params.id}, {$set: {name: req.body.name, pnum: req.body.pnum, email: req.body.email, address: req.body.address, birthDate: Date(req.body.birthDate)}})
            .then(()=>{
                res.json({
                    message: "update success"
                });
            })
            .catch(err => {
                res.json({
                    message: "update fail"
                })
                console.log(err);
            })
    }
}

module.exports = new UserController();