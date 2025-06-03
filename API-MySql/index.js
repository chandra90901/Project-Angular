const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
//require("./database/tables/createAttendanceTable"); 
const userRoutes = require("./routes/userRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const roleRoutes = require("./routes/roleRoutes");
const timesheetRoutes = require("./routes/timesheetRoutes");
const candidatehistoryRoutes = require("./routes/candidatehistoryRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const masterRoutes = require("./routes/masterRoutes");
const mastertypeRoutes = require("./routes/mastertypeRoutes");
const mastergroupRoutes = require("./routes/mastergroupRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const offerletterRoutes = require("./routes/offerletterRoutes");
const profileRoutes = require("./routes/profileRoutes");
const appsettingRoutes = require("./routes/appsettingRoutes");
const holidayRoutes = require("./routes/holidayRoutes");
const customerRoutes = require("./routes/customerRoutes")
const invoiceRoutes = require("./routes/invoiceRoutes")
const notificationRoutes = require("./routes/notificationRoutes");
const notificationGroupRoutes = require("./routes/notificationGroupRoutes");
const notificationGroupEmployeeRoutes = require("./routes/notificationGroupEmployeeRoutes");
const moduleRoutes = require("./routes/moduleRoutes");
const announcementRoutes = require("./routes/announcementRoutes");

const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Swagger version
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation for My Node.js app',
    },
  },
  // Path to the API docs (where you write JSDoc comments)
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app = express();
app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;


// Use the user routes
app.use("/api/user", userRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/timesheet", timesheetRoutes);
app.use("/api/candidatehistory", candidatehistoryRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/master", masterRoutes);
app.use("/api/mastertype", mastertypeRoutes);
app.use("/api/mastergroup", mastergroupRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/offerletter", offerletterRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/appsetting", appsettingRoutes);
app.use("/api/holiday", holidayRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/notificationGroup", notificationGroupRoutes);
app.use("/api/notificationGroupEmployee", notificationGroupEmployeeRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/api/module", moduleRoutes);
app.use("/api/announcement", announcementRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
