const express = require("express");
const timesheetController = require("../controllers/timesheetController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Timesheet
 *     description: Timesheet management
 */

/**
 * @swagger
 * /api/timesheet:
 *   post:
 *     tags: [Timesheet]
 *     summary: Create a new timesheet record
 *     description: Creates a new timesheet record for an employee.
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
 *                 enum: [new, approved, rejected]
 *     responses:
 *       201:
 *         description: Timesheet record created successfully
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
router.post("/", timesheetController.createTimesheet);

/**
 * @swagger
 * /api/timesheet:
 *   get:
 *     tags: [Timesheet]
 *     summary: Get all timesheet records
 *     description: Retrieves a list of all timesheet records.
 *     responses:
 *       200:
 *         description: A list of all timesheet records
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
 *                     enum: [new, approved, rejected]
 *       500:
 *         description: Server error
 */
router.get("/", timesheetController.getAllTimesheets);

/**
 * @swagger
 * /api/timesheet/{id}:
 *   get:
 *     tags: [Timesheet]
 *     summary: Get an timesheet record by ID
 *     description: Retrieve a specific timesheet record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the timesheet record
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested timesheet record
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
 *                   enum: [new, approved, rejected]
 *       404:
 *         description: Timesheet record not found
 *       500:
 *         description: Server error
 */
router.get("/:id", timesheetController.getTimesheetById);

/**
 * @swagger
 * /api/timesheet/{id}:
 *   put:
 *     tags: [Timesheet]
 *     summary: Update an timesheet record
 *     description: Modify an existing timesheet record by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the timesheet record to update
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
 *                 enum: [new, approved, rejected]
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Timesheet record updated
 *       404:
 *         description: Timesheet record not found
 *       500:
 *         description: Server error
 */
router.put("/:id", timesheetController.updateTimesheet);

/**
 * @swagger
 * /api/timesheet/{id}:
 *   delete:
 *     tags: [Timesheet]
 *     summary: Delete an timesheet record
 *     description: Delete a specific timesheet record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the timesheet record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Timesheet record deleted successfully
 *       404:
 *         description: Timesheet record not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", timesheetController.deleteTimesheet);
router.get("/reqtimesheets/:mgrId", timesheetController.getReqTimesheets);

/**
 * @swagger
 * /api/timesheet/mytimesheet/{employeeId}:
 *   get:
 *     tags: [Timesheet]
 *     summary: Get an employee's timesheet record
 *     description: Retrieve the timesheet record of a specific employee.
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         description: The ID of the employee whose timesheet is being retrieved
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested timesheet record
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
 *                   enum: [new, approved, rejected]
 *       404:
 *         description: Timesheet record not found
 *       500:
 *         description: Server error
 */
router.get("/mytimesheet/:employeeId", timesheetController.getMyTimesheets);

module.exports = router;

