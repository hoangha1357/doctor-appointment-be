const Feedback = require("../models/Feedback");
const User = require("../models/User");

class FeedbackController {
  async createFeedback(req, res, _next) {
    const { doctorId, userId, contents } = req.body;
    console.log(doctorId, userId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const doctor = await User.findOne({ id: doctorId, type: "Doctor" });
    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    const feedback = new Feedback({
      doctorId: doctor._id,
      contents: contents,
      fbUser: user._id,
    });

    try {
      await feedback.save();
      res.status(201).json({
        message: "Feedback created successfully",
      });
    } catch (e) {
      res.status(500).json({
        message: e.message,
      });
    }
  }

  async getAllFeedbacks(_req, res, _next) {
    try {
      const feedbacks = await Feedback.find({});
      console.log(feedbacks);
      res.status(200).json({
        feedbacks: feedbacks,
      });
    } catch (e) {
      res.status(500).json({
        message: e.message,
      });
    }
  }

  async getFeedback(req, res, _next) {
    try {
      const feedbacks = await Feedback.find({ doctorId: req.params["id"] })
        .populate("fbUser");
      console.log(feedbacks);
      res.status(200).json({
        feedbacks: feedbacks,
      });
    } catch (e) {
      res.status(500).json({
        message: e.message,
      });
    }
  }
}

module.exports = new FeedbackController();
