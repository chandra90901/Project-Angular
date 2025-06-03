const express = require("express");
const invoiceController = require("../controllers/invoiceController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Invoice
 *     description: Invoice management
 */

/**
 * @swagger
 * /api/invoice:
 *   post:
 *     tags: [Invoice]
 *     summary: Create a new invoice record
 *     description: Creates a new invoice record for an employee.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_Id:
 *                 type: integer
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Invoice record created successfully
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
router.post("/",invoiceController.createInvoice);

/**
 * @swagger
 * /api/invoice:
 *   get:
 *     tags: [Invoice]
 *     summary: Get all invoice records
 *     description: Retrieves a list of all invoice records.
 *     responses:
 *       200:
 *         description: A list of all invoice records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   customer_Id:
 *                     type: integer
 *                   status:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/", invoiceController.getAllInvoices);

/**
 * @swagger
 * /api/invoice/{id}:
 *   get:
 *     tags: [Invoice]
 *     summary: Get an invoice record by ID
 *     description: Retrieve a specific invoice record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the invoice record
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested invoice record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 customer_Id:
 *                   type: integer
 *                 status:
 *                   type: string
 *       404:
 *         description: Invoice record not found
 *       500:
 *         description: Server error
 */
router.get("/:id", invoiceController.getInvoiceById);

/**
 * @swagger
 * /api/invoice/{id}:
 *   put:
 *     tags: [Invoice]
 *     summary: Update an invoice record
 *     description: Modify an existing invoice record by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the invoice record to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:string
 *     responses:
 *       200:
 *         description: Invoice record updated
 *       404:
 *         description: Invoice record not found
 *       500:
 *         description: Server error
 */
router.put("/:id", invoiceController.updateInvoice);

/**
 * @swagger
 * /api/invoice/{id}:
 *   delete:
 *     tags: [Invoice]
 *     summary: Delete an invoice record
 *     description: Delete a specific invoice record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the invoice record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Invoice  deleted successfully
 *       404:
 *         description: Invoice record not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", invoiceController.deleteInvoice);

/**
 * @swagger
 * /api/invoice/myinvoice/{probationPeriod}:
 *   get:
 *     tags: [Invoice]
 *     summary: Get an employee's invoice record
 *     description: Retrieve the invoice record of a specific employee.
 *     parameters:
 *       - in: path
 *         name: probationPeriod
 *         required: true
 *         description: The ID of the employee whose invoice is being retrieved
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested invoice record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 customer_Id:
 *                   type: integer
 *                 status:
 *                   type: string
 *       404:
 *         description: Invoice record not found
 *       500:
 *         description: Server error
 */
router.get("/myInvoice/:status",invoiceController.getAllInvoices);

module.exports = router;
