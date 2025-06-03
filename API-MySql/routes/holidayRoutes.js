const express = require("express");
const holidayController = require("../controllers/holidayController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Holiday
 *     description: Holiday management
 */

/**
 * @swagger
 * /api/holiday:
 *   post:
 *     tags: [Holiday]
 *     summary: Create a new holiday record
 *     description: Creates a new holiday record for an employee.
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
 *                 enum: [active, inactive]
 *     responses:
 *       201:
 *         description: Holiday record created successfully
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
router.post("/", holidayController.createHoliday);

/**
 * @swagger
 * /api/holiday:
 *   get:
 *     tags: [Holiday]
 *     summary: Get all holiday records
 *     description: Retrieves a list of all holiday records.
 *     responses:
 *       200:
 *         description: A list of all holiday records
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
 *                     enum: [active, inactive]
 *       500:
 *         description: Server error
 */
router.get("/", holidayController.getAllHolidays);

/**
 * @swagger
 * /api/holiday/{id}:
 *   get:
 *     tags: [Holiday]
 *     summary: Get an holiday record by ID
 *     description: Retrieve a specific holiday record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the holiday record
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested holiday record
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
 *                   enum: [active, inactive]
 *       404:
 *         description: Holiday record not found
 *       500:
 *         description: Server error
 */
router.get("/:id", holidayController.getHolidayById);

/**
 * @swagger
 * /api/holiday/{id}:
 *   put:
 *     tags: [Holiday]
 *     summary: Update an holiday record
 *     description: Modify an existing holiday record by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the holiday record to update
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
 *                 enum: [active, inactive]
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Holiday record updated
 *       404:
 *         description: Holiday record not found
 *       500:
 *         description: Server error
 */
router.put("/:id", holidayController.updateHoliday);

/**
 * @swagger
 * /api/holiday/{id}:
 *   delete:
 *     tags: [Holiday]
 *     summary: Delete an holiday record
 *     description: Delete a specific holiday record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the holiday record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Holiday record deleted successfully
 *       404:
 *         description: Holiday record not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", holidayController.deleteHoliday);



module.exports = router;
