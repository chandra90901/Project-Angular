const express = require("express");
const mastergroupController = require("../controllers/mastergroupController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Mastergroup
 *     description: Mastergroup management
 */

/**
 * @swagger
 * /api/mastergroup:
 *   post:
 *     tags: [Mastergroup]
 *     summary: Create a new mastergroup record
 *     description: Creates a new mastergroup record for an employee.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string   
 *     responses:
 *       201:
 *         description: Mastergroup record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *       500:
 *         description: Server error
 */
router.post("/", mastergroupController.createMastergroup);

/**
 * @swagger
 * /api/mastergroup:
 *   get:
 *     tags: [Mastergroup]
 *     summary: Get all mastergroup records
 *     description: Retrieves a list of all mastergroup records.
 *     responses:
 *       200:
 *         description: A list of all mastergroup records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   data:
 *                       type: string
 *       500:
 *         description: Server error
 */
router.get("/", mastergroupController.getAllMastergroup);

/**
 * @swagger
 * /api/mastergroup/{id}:
 *   get:
 *     tags: [Mastergroup]
 *     summary: Get an mastergroup record by ID
 *     description: Retrieve a specific mastergroup record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the mastergroup record
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested mastergroup record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                 type: string
 *       404:
 *         description: Mastergroup record not found
 *       500:
 *         description: Server error
 */
router.get("/:id", mastergroupController.getMastergroupById);

/**
 * @swagger
 * /api/mastergroup/{id}:
 *   put:
 *     tags: [Mastergroup]
 *     summary: Update an mastergroup record
 *     description: Modify an existing mastergroup record by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the mastergroup record to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                data:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mastergroup record updated
 *       404:
 *         description: Mastergroup record not found
 *       500:
 *         description: Server error
 */
router.put("/:id", mastergroupController.updateMastergroup);

/**
 * @swagger
 * /api/mastergroup/{id}:
 *   delete:
 *     tags: [Mastergroup]
 *     summary: Delete an mastergroup record
 *     description: Delete a specific mastergroup record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the mastergroup record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mastergroup record deleted successfully
 *       404:
 *         description: Mastergroup record not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", mastergroupController.deleteMastergroup);

// /**
//  * @swagger
//  * /api/mastergroup/myattendance/{employeeId}:
//  *   get:
//  *     tags: [Attendance]
//  *     summary: Get an employee's attendance record
//  *     description: Retrieve the attendance record of a specific employee.
//  *     parameters:
//  *       - in: path
//  *         name: employeeId
//  *         required: true
//  *         description: The ID of the employee whose attendance is being retrieved
//  *         schema:
//  *           type: integer
//  *     responses:
//  *       200:
//  *         description: The requested attendance record
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                data:
//  *                type: string
//  *       404:
//  *         description: Attendance record not found
//  *       500:
//  *         description: Server error
//  */
// router.get("/myattendance/:employeeId", attendanceController.getMyAttendance);

module.exports = router;
