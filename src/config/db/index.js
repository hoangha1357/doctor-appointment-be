const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://hpro1357:Hoang1357@cluster0.pvkar.mongodb.net/dr_appointment', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected');
    } catch (error) {
        console.log("Can't connect");
    }
}

module.exports = { connect };