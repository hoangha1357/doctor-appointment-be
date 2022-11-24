const User = require('../models/User');
const DoctorProfile = require('../models/DoctorProfile');
class DoctorController {
    
    updateProfile = async (req, res, next) => {
        const { major, certificate } = req.body;
    
        
    }
}

module.exports = new DoctorController();
