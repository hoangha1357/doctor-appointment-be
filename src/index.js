// const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const db = require('./config/db');
const route = require('./routes/index');
var cors = require('cors');
const methodOverride = require('method-override');

db.connect();
app.use(cors());
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(methodOverride('_method')); //override using a query value

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

app.use(route);

app.listen(process.env.PORT || port, () => {
    console.log(`Doctor appointment app listening at http://localhost:${port}`);
});

app.use((err, req, res, next) => {
    console.log("local: ",err.message)
    
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (!err.message) {
        console.log("next");
        next();
    }
    res.status(err.statusCode).json({
        success: false,
        status: err.status,
        message: err?.message,
    });
});