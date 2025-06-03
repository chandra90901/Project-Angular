require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const masters = require('./routes/masters');
const mastertype = require('./routes/mastertype');
const mastergroup = require('./routes/mastergroup');
const employee = require('./routes/employee');
const customer = require('./routes/customer');
const role = require('./routes/role');
const user = require('./routes/user');
const salary = require('./routes/salary');
const timesheet = require('./routes/timesheet');
const candidate= require('./routes/candidate');
const leave = require('./routes/leave');
const attendance = require('./routes/attendance');
const candidateremark = require('./routes/candidateremark');
const offerletter = require('./routes/offerletter');

var cors = require('cors');

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

let corsOptions = {
    origin: ['http://localhost:4200'],
}
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', masters);
app.use('/api', mastertype);
app.use('/api', mastergroup);
app.use('/api', employee);
app.use('/api', customer);
app.use('/api', user);
app.use('/api', role);
app.use('/api', salary);
app.use('/api', timesheet);
app.use('/api', candidate);
app.use('/api', leave);
app.use('/api', attendance);
app.use('/api', candidateremark);
app.use('/api', offerletter);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})