// const express = require("express");
// const leaveController = require("../controllers/leaveController");
// const router = express.Router();

// router.post("/", leaveController.createLeave);
// router.get("/", leaveController.getAllLeaves);
// router.get("/:id", leaveController.getLeaveById);
// router.put("/:id", leaveController.updateLeave);
// router.delete("/:id", leaveController.deleteLeave);
// router.get("/myleaves/:employeeId", leaveController.getMyLeaves);
// router.get("/reqleaves/:mgrId", leaveController.getReqLeaves);

// module.exports = router;

const express = require("express");
const leaveController = require("../controllers/leaveController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Leave
 *     description: Leave management
 */

/**
 * @swagger
 * /api/leave:
 *   post:
 *     tags: [Leave]
 *     summary: Create a new leave record
 *     description: Creates a new leave record for an employee.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               leavetype:
 *                 type: string
 *               fromDate:
 *                 type: string
 *                 format: date
 *               reason:
 *                 type: string
 *     responses:
 *       201:
 *         description: Leave record created successfully
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
router.post("/", leaveController.createLeave);

/**
 * @swagger
 * /api/leave:
 *   get:
 *     tags: [Leave]
 *     summary: Get all leave records
 *     description: Retrieves a list of all leave records.
 *     responses:
 *       200:
 *         description: A list of all leave records
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
 *                   fromDate:
 *                     type: string
 *                     format: date
 *                   reason:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/", leaveController.getAllLeaves);

/**
 * @swagger
 * /api/leave/{id}:
 *   put:
 *     tags: [Leave]
 *     summary: Update an leave record
 *     description: Modify an existing leave record by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the leave record to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *               fromDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Leave record updated
 *       404:
 *         description: Leave record not found
 *       500:
 *         description: Server error
 */
router.put("/:id", leaveController.updateLeave);

/**
 * @swagger
 * /api/leave/{id}:
 *   delete:
 *     tags: [Leave]
 *     summary: Delete an leave record
 *     description: Delete a specific leave record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the leave record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Leave record deleted successfully
 *       404:
 *         description: Leave record not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", leaveController.deleteLeave);

/**
 * @swagger
 * /api/leave/myleave/{employeeId}:
 *   get:
 *     tags: [Leave]
 *     summary: Get an employee's leave record
 *     description: Retrieve the leave record of a specific employee.
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         description: The ID of the employee whose leave is being retrieved
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested leave record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 employeeId:
 *                   type: integer
 *                 fromDate:
 *                   type: string
 *                   format: date
 *                 reason:
 *                   type: string
 *       404:
 *         description: Leave record not found
 *       500:
 *         description: Server error
 */
router.get("/myleave/:employeeId", leaveController.getMyLeaves);
router.get("/reqleave/:mgrId", leaveController.getReqLeaves);

/**
 * @swagger
 * /api/leave/{id}:
 *   get:
 *     tags: [Leave]
 *     summary: Get an leave record by ID
 *     description: Retrieve a specific leave record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the leave record
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested leave record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 employeeId:
 *                   type: integer
 *                 fromDate:
 *                   type: string
 *                   format: date
 *                 reason:
 *                   type: string
 *       404:
 *         description: Leave record not found
 *       500:
 *         description: Server error
 */
router.get("/:id", leaveController.getLeaveById);
module.exports = router;
