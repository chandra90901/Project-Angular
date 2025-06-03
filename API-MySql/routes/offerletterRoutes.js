const express = require("express");
const offerletterController = require("../controllers/offerletterController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: OfferLetter
 *     description: OfferLetter management
 */

/**
 * @swagger
 * /api/offerletter:
 *   post:
 *     tags: [OfferLetter]
 *     summary: Create a new offerletter record
 *     description: Creates a new offerletter record for an employee.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               probationPeriod:
 *                 type: integer
 *               date:
 *                 type: string
 *                 format: date
 *               employeeType:
 *                 type: string
 *                 enum: [part-time, full-time, contract, internship, freelance]
 *     responses:
 *       201:
 *         description: OfferLetter record created successfully
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
router.post("/", offerletterController.createOfferLetter);

/**
 * @swagger
 * /api/offerletter:
 *   get:
 *     tags: [OfferLetter]
 *     summary: Get all offerletter records
 *     description: Retrieves a list of all offerletter records.
 *     responses:
 *       200:
 *         description: A list of all offerletter records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   probationPeriod:
 *                     type: integer
 *                   date:
 *                     type: string
 *                     format: date
 *                   employeeType:
 *                     type: string
 *                     enum: [part-time, full-time, contract, internship, freelance]
 *       500:
 *         description: Server error
 */
router.get("/", offerletterController.getAllOfferLetters);

/**
 * @swagger
 * /api/offerletter/{id}:
 *   get:
 *     tags: [OfferLetter]
 *     summary: Get an offerletter record by ID
 *     description: Retrieve a specific offerletter record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the offerletter record
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested offerletter record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 probationPeriod:
 *                   type: integer
 *                 date:
 *                   type: string
 *                   format: date
 *                 employeeType:
 *                   type: string
 *                   enum: [part-time, full-time, contract, internship, freelance]
 *       404:
 *         description: OfferLetter record not found
 *       500:
 *         description: Server error
 */
router.get("/:id", offerletterController.getOfferLetterById);

/**
 * @swagger
 * /api/offerletter/{id}:
 *   put:
 *     tags: [OfferLetter]
 *     summary: Update an offerletter record
 *     description: Modify an existing offerletter record by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the offerletter record to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeType:
 *                   type: string
 *                   enum: [part-time, full-time, contract, internship, freelance]
 *               date:
 *                   type: string
 *                   format: date
 *     responses:
 *       200:
 *         description: OfferLetter record updated
 *       404:
 *         description: OfferLetter record not found
 *       500:
 *         description: Server error
 */
router.put("/:id", offerletterController.updateOfferLetter);

/**
 * @swagger
 * /api/offerletter/{id}:
 *   delete:
 *     tags: [OfferLetter]
 *     summary: Delete an offerletter record
 *     description: Delete a specific offerletter record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the offerletter record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OfferLetter  deleted successfully
 *       404:
 *         description: OfferLetter record not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", offerletterController.deleteOfferLetter);

/**
 * @swagger
 * /api/offerletter/myofferletter/{probationPeriod}:
 *   get:
 *     tags: [OfferLetter]
 *     summary: Get an employee's offerletter record
 *     description: Retrieve the offerletter record of a specific employee.
 *     parameters:
 *       - in: path
 *         name: probationPeriod
 *         required: true
 *         description: The ID of the employee whose offerletter is being retrieved
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested offerletter record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 probationPeriod:
 *                   type: integer
 *                 date:
 *                   type: string
 *                   format: date
 *                 employeeType:
 *                   type: string
 *                   enum: [part-time, full-time, contract, internship, freelance]
 *       404:
 *         description: OfferLetter record not found
 *       500:
 *         description: Server error
 */
router.get("/myofferletter/:probationPeriod", offerletterController.getAllOfferLetters);

module.exports = router;
