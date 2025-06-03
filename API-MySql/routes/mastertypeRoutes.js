const express = require("express");
const mastertypeController = require("../controllers/mastertypeController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Mastertype
 *     description: Mastertype management
 */

/**
 * @swagger
 * /api/mastertype:
 *   post:
 *     tags: [Mastertype]
 *     summary: Create a new mastertype record
 *     description: Creates a new mastertype record for an employee.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupId:
 *                 type: integer
 *               data:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mastertype record created successfully
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
router.post("/", mastertypeController.createMastertype);

/**
 * @swagger
 * /api/mastertype:
 *   get:
 *     tags: [Mastertype]
 *     summary: Get all mastertype records
 *     description: Retrieves a list of all mastertype records.
 *     responses:
 *       200:
 *         description: A list of all mastertype records
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
 *                   data:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/", mastertypeController.getAllMastertype);

/**
 * @swagger
 * /api/mastertype/{id}:
 *   get:
 *     tags: [Mastertype]
 *     summary: Get an mastertype record by ID
 *     description: Retrieve a specific mastertype record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the mastertype record
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested mastertype record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 groupId:
 *                   type: integer
 *                 data:
 *                   type: string
 *       404:
 *         description: Mastertype record not found
 *       500:
 *         description: Server error
 */
router.get("/:id",mastertypeController.getMastertypeById);

/**
 * @swagger
 * /api/mastertype/{id}:
 *   put:
 *     tags: [Mastertype]
 *     summary: Update an mastertype record
 *     description: Modify an existing mastertype record by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the mastertype record to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupId:
 *                 type: integer
 *               data:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mastertype record updated
 *       404:
 *         description: Mastertype record not found
 *       500:
 *         description: Server error
 */
router.put("/:id", mastertypeController.updateMastertype);

/**
 * @swagger
 * /api/mastertype/{id}:
 *   delete:
 *     tags: [Mastertype]
 *     summary: Delete an mastertype record
 *     description: Delete a specific mastertype record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the mastertype record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mastertype record deleted successfully
 *       404:
 *         description: Mastertype record not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", mastertypeController.deleteMastertype);

/**
 * @swagger
 * /api/mastertype/mymastertype/{groupId}:
 *   get:
 *     tags: [Mastertype]
 *     summary: Get an employee's mastertype record
 *     description: Retrieve the mastertype record of a specific employee.
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         description: The ID of the employee whose mastertype is being retrieved
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested mastertype record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 groupId:
 *                   type: integer
 *                 data:
 *                   type: string
 *       404:
 *         description: Mastertype record not found
 *       500:
 *         description: Server error
 */
router.get("/mymastertype/:groupId", mastertypeController.getMyMastertype);

module.exports = router;