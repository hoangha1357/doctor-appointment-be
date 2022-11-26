const Appointment = require('../models/AppointmentModel');
const createError = require('http-errors');

class AppointmentController {
    appointment = async (req, res, next) => {
        try {
            const patient = req.user.id;
            const { doctor, date, description } = req.body;

            const newApmt = await Appointment.create({ doctor, patient, date, description });
            if(!newApmt) {
                console.log("The appointment do not create yet");
                return next(createError.InternalServerError(err?.message));
            }

            return res.status(201).json({
                success: true,
                data: newApmt
            });
        } catch (error) {
            return next(createError.InternalServerError(err?.message));
        }
    }

    getAllAppointment = async (req, res, next) => {
        Appointment.find({}).lean()
            .then((apts)=>{
                res.json(apts);
            })
    }

    editAppointment = (req, res, next) => {
        try {
            console.log(req.params.id)
            Appointment.findOneAndUpdate({_id: req.params.id}, req.body,  {new: true})
                    .then((appointment) => {
                        res.status(200).json({
                            success: true,
                            data: appointment
                        });
                    })

        } catch (error) {
            return next(createError.BadRequest('Bad request'));
        }
    }

    cancelAppointment = async (req, res, next) => {
        try {
            await Appointment.findByIdAndDelete(req.params.id);

            res.status(204).json({
                success: true,
                data: null
            })
        } catch (error) {
            return next(createError.BadRequest(' Bad request'));
        }
    }
}

module.exports = new AppointmentController();