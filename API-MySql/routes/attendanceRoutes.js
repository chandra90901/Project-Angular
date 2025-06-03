const express = require("express");
const attendanceController = require("../controllers/attendanceController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Attendance
 *     description: Attendance management
 */

/**
 * @swagger
 * /api/attendance:
 *   post:
 *     tags: [Attendance]
 *     summary: Create a new attendance record
 *     description: Creates a new attendance record for an employee.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeId:
 *                 type: integer
 *               date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [present, absent, leave]
 *     responses:
 *       201:
 *         description: Attendance record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 id:
 *                   type: integer
 *       500:
 *         description: Server error
 */
router.post("/", attendanceController.createAttendance);

/**
 * @swagger
 * /api/attendance:
 *   get:
 *     tags: [Attendance]
 *     summary: Get all attendance records
 *     description: Retrieves a list of all attendance records.
 *     responses:
 *       200:
 *         description: A list of all attendance records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   employeeId:
 *                     type: integer
 *                   date:
 *                     type: string
 *                     format: date
 *                   status:
 *                     type: string
 *                     enum: [present, absent, leave]
 *       500:
 *         description: Server error
 */
router.get("/", attendanceController.getAllAttendance);

/**
 * @swagger
 * /api/attendance/{id}:
 *   put:
 *     tags: [Attendance]
 *     summary: Update an attendance record
 *     description: Modify an existing attendance record by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the attendance record to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [present, absent, leave]
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Attendance record updated
 *       404:
 *         description: Attendance record not found
 *       500:
 *         description: Server error
 */
router.put("/:id", attendanceController.updateAttendance);

/**
 * @swagger
 * /api/attendance/{id}:
 *   delete:
 *     tags: [Attendance]
 *     summary: Delete an attendance record
 *     description: Delete a specific attendance record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the attendance record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Attendance record deleted successfully
 *       404:
 *         description: Attendance record not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", attendanceController.deleteAttendance);

/**
 * @swagger
 * /api/attendance/myattendance/{employeeId}:
 *   get:
 *     tags: [Attendance]
 *     summary: Get an employee's attendance record
 *     description: Retrieve the attendance record of a specific employee.
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         description: The ID of the employee whose attendance is being retrieved
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested attendance record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 employeeId:
 *                   type: integer
 *                 date:
 *                   type: string
 *                   format: date
 *                 status:
 *                   type: string
 *                   enum: [present, absent, leave]
 *       404:
 *         description: Attendance record not found
 *       500:
 *         description: Server error
 */
router.get("/myattendance/:employeeId", attendanceController.getMyAttendance);
router.get("/reqattendance/:mgrId", attendanceController.getReqAttendance);

/**
 * @swagger
 * /api/attendance/{id}:
 *   get:
 *     tags: [Attendance]
 *     summary: Get an attendance record by ID
 *     description: Retrieve a specific attendance record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the attendance record
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested attendance record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 employeeId:
 *                   type: integer
 *                 date:
 *                   type: string
 *                   format: date
 *                 status:
 *                   type: string
 *                   enum: [present, absent, leave]
 *       404:
 *         description: Attendance record not found
 *       500:
 *         description: Server error
 */
router.get("/:id", attendanceController.getAttendanceById);
module.exports = router;
