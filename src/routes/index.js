const express = require("express");
const router = express.Router();
const HomeController = require("../app/controllers/homeController");
const UserController = require("../app/controllers/userController");
const DoctorController = require("../app/controllers/doctorController");
const FeedbackController = require("../app/controllers/feedBackcontroller.js");
const AppointmentController = require("../app/controllers/appointmentController");
const passport = require("passport");
const auth = require("../app/middlewares/auth");

router.get("/", (req, res) => {
  res.send("DR apt api");
});

router.post("/register", HomeController.register);
router.post(
  "/login",
  passport.authenticate("local", { session: false, failureMessage: false }),
  HomeController.login,
);

router.post('/appointment/create', auth.Authorization , AppointmentController.appointment)
router.patch('/appointment/:id', auth.Authorization , AppointmentController.editAppointment)
router.delete('/appointment/:id', auth.Authorization , AppointmentController.cancelAppointment)
router.get('/appointment/getAppointment', auth.Authorization, AppointmentController.getAllAppointment)
router.patch('/appointment/:id/aprove', auth.AuthorizationDoctor, AppointmentController.aproveAppointment)

//user api
router.get("/user", auth.Authorization ,UserController.getUsers);
router.get("/user/:id", auth.Authorization , UserController.getUserById);
router.post("/user/:id/update", auth.Authorization , UserController.updateUser);

//doctor api
router.get("/doctor/search", auth.Authorization ,DoctorController.getDoctorsByName);
router.get("/doctor/search/major", auth.Authorization ,DoctorController.getDoctorsByMajor);
router.post("/doctor/profile", auth.Authorization ,DoctorController.updateProfile);

//feedback ap
router.route("/feedbacks")
  .get(FeedbackController.getAllFeedbacks)
  .post(FeedbackController.createFeedback);
router.get("/feedbacks/:id", FeedbackController.getFeedback);

module.exports = router;
