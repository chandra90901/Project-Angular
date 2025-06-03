const express = require("express");
const customerController = require("../controllers/customerController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Customer
 *     description: Customer management
 */

/**
 * @swagger
 * /api/customer:
 *   post:
 *     tags: [Customer]
 *     summary: Create a new customer record
 *     description: Creates a new customer record for an employee.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CustomerName:
 *                 type: string
 *               EntityTypeId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Customer record created successfully
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
router.post("/", customerController.createCustomer);

/**
 * @swagger
 * /api/customer:
 *   get:
 *     tags: [Customer]
 *     summary: Get all customer records
 *     description: Retrieves a list of all customer records.
 *     responses:
 *       200:
 *         description: A list of all customer records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *               CustomerName:
 *                 type: string
 *               EntityTypeId:
 *                 type: integer
 *       500:
 *         description: Server error
 */
router.get("/", customerController.getAllCustomers);

/**
 * @swagger
 * /api/customer/{id}:
 *   get:
 *     tags: [Customer]
 *     summary: Get an customer record by ID
 *     description: Retrieve a specific customer record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the customer record
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested customer record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *               CustomerName:
 *                 type: string
 *               EntityTypeId:
 *                 type: integer
 *       404:
 *         description: Customer record not found
 *       500:
 *         description: Server error
 */
router.get("/:id", customerController.getCustomerById);

/**
 * @swagger
 * /api/customer/{id}:
 *   put:
 *     tags: [Customer]
 *     summary: Update an customer record
 *     description: Modify an existing customer record by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the customer record to update
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
 *         description: customer record updated
 *       404:
 *         description: Customer record not found
 *       500:
 *         description: Server error
 */
router.put("/:id", customerController.updateCustomer);

/**
 * @swagger
 * /api/customer/{id}:
 *   delete:
 *     tags: [Customer]
 *     summary: Delete an customer record
 *     description: Delete a specific customer record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the customer record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer record deleted successfully
 *       404:
 *         description: Customer record not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
