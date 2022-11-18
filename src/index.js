// const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const db = require('./config/db');
const route = require('./routes/index');
const methodOverride = require('method-override');

db.connect();

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

app.listen(port, () => {
    console.log(`Doctor appointment app listening at http://localhost:${port}`);
});