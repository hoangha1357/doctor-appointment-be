const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedBack = new Schema(
    {
        doctorId: { type: Schema.Types.ObjectId , ref: 'User' },
        fbUser: { type: Schema.Types.ObjectId , ref: 'User' },
        contents: { type: String}
    }
);
module.exports = mongoose.model('FeedBack', FeedBack);
