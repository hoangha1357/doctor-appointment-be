const User = require('../models/User');
const DoctorProfile = require('../models/DoctorProfile');
class DoctorController {


    async updateProfile(req, res, next){
        const {doctorid ,major, certificate } = req.body;
        try {
            if(major && certificate){
                let drProfile = await DoctorProfile.findOne({doctorId : doctorid});
                if(drProfile){
                    await DoctorProfile.findOneAndUpdate({doctorId: drProfile.doctorId},{$set: {major : major, certificate : certificate}});
                }else{
                    let doctor = await User.findOne({_id: doctorid});
                    if(doctor?.type == "Doctor"){
                        DoctorProfile.findByIdAndUpdate({doctorId: doctorid}, {$set:{certificate: certificate, major : major}});
                    }else{
                        console.log(doctor);
                        throw new Error("User is not a Doctor"); 
                    }
                }
                res.status(200).json({message: "Update success"});
            }
        }catch(err){
            res.json({
                message: "update fail"
            });
            console.log(err);
        }    
    }

    getDoctorsByName = (req, res, next)=>{
        const {name} = req.query;
        User.find({name: {$regex: name, $options: '$i'}, type: 'Doctor'}).lean()
            .then((users)=>{
                let resObj=[];
                for(let user of users){
                    resObj.push({
                        id: user._id,
                        name: user.name,
                        pnum: user.pnum,
                        email: user.email,
                        address: user.address,
                        birthDate: user.birthDate,
                    })
                }
                res.status(200).json(resObj);
            }).catch((err)=>{
                res.json({message: "Can not find"});
                console.log(err);
            })
    }

    getDoctorsByMajor(req, res, next){
        const {major} = req.query;
        DoctorProfile.find({major: major}).populate("doctorId").lean()
            .then((drProfiles) =>{
                let resObj=[];
                for(let drProf of drProfiles){
                    const dr = {
                        id: user._id,
                        name: drProf.doctorId.name,
                        pnum: drProf.doctorId.pnum,
                        email: drProf.doctorId.email, 
                        address: drProf.doctorId.address,
                        birthDate: drProf.doctorId.birthDate,
                        major: drProf.major,
                        certificate: drProf.certificate
                    }
                    resObj.push(dr);
                }
                res.json(resObj);
            })
            .catch((err) =>{
                res.json({message: "Can Not found"});
                console.log(err);
            });
    }
}

module.exports = new DoctorController();
