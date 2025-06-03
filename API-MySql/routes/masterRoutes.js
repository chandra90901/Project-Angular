const express = require("express");
const masterController = require("../controllers/masterController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Master
 *     description: Master management
 */

/**
 * @swagger
 * /api/master:
 *   post:
 *     tags: [Master]
 *     summary: Create a new master record
 *     description: Creates a new master record for an employee.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              GroupId:
 *                  type: number
 *              TypeId:
 *                  type: number
 *              Data:
 *                  type: String
 *                
 *     responses:
 *       201:
 *         description: Master record created successfully
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

router.post("/", masterController.createMaster);

/**
 * @swagger
 * /api/master:
 *   get:
 *     tags: [Master]
 *     summary: Get all master records
 *     description: Retrieves a list of all master records.
 *     responses:
 *       200:
 *         description: A list of all master records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   groupId:
 *                     type: integer
 *                   typeId:
 *                     type: string
 *                   data:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/", masterController.getAllMaster);


/**
 * @swagger
 * /api/master/{id}:
 *   get:
 *     tags: [Master]
 *     summary: Get an master record by ID
 *     description: Retrieve a specific master record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the master record
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested master record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 groupId:
 *                   type: integer
 *                 typeId:
 *                   type: string
 *                 data:
 *                   type: string
 *       404:
 *         description: Attendance record not found
 *       500:
 *         description: Server error
 */
router.get("/:id",masterController.getMasterById);

router.put("/:id", masterController.updateMaster);

router.delete("/:id", masterController.deleteMaster);

module.exports = router;