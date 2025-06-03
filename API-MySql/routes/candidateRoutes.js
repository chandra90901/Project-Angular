const express = require("express");
const candidateController = require("../controllers/candidateController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Candidate
 *     description: Candidate management
 */

/**
 * @swagger
 * /api/candidate:
 *   post:
 *     tags: [Candidate]
 *     summary: Create a new candidate record
 *     description: Creates a new candidate record for an employee.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               candidateName:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       201:
 *         description: Candidate record created successfully
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
router.post("/", candidateController.createCandidate);

/**
 * @swagger
 * /api/candidate:
 *   get:
 *     tags: [Candidate]
 *     summary: Get all candidate records
 *     description: Retrieves a list of all candidate records.
 *     responses:
 *       200:
 *         description: A list of all candidate records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   candidateName:
 *                     type: string
 *                   emailAddress:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/", candidateController.getAllCandidates);

/**
 * @swagger
 * /api/candidate/{id}:
 *   get:
 *     tags: [Candidate]
 *     summary: Get an candidate record by ID
 *     description: Retrieve a specific candidate record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the candidate record
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested candidate record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 candidateName:
 *                   type: string
 *                 emailAddress:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *       404:
 *         description: Candidate record not found
 *       500:
 *         description: Server error
 */
router.get("/:id", candidateController.getCandidateById);

/**
 * @swagger
 * /api/candidate/{id}:
 *   put:
 *     tags: [Candidate]
 *     summary: Update an candidate record
 *     description: Modify an existing candidate record by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the candidate record to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *     responses:
 *       200:
 *         description: Candidate record updated
 *       404:
 *         description: Candidate record not found
 *       500:
 *         description: Server error
 */
router.put("/:id", candidateController.updateCandidate);

/**
 * @swagger
 * /api/candidate/{id}:
 *   delete:
 *     tags: [Candidate]
 *     summary: Delete an candidate record
 *     description: Delete a specific candidate record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the candidate record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Candidate record deleted successfully
 *       404:
 *         description: Candidate record not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", candidateController.deleteCandidate);

/**
 * @swagger
 * /api/candidate/mycandidate/{candidateName}:
 *   get:
 *     tags: [Candidate]
 *     summary: Get an employee's candidate record
 *     description: Retrieve the candidate record of a specific employee.
 *     parameters:
 *       - in: path
 *         name: candidateName
 *         required: true
 *         description: The ID of the employee whose candidate is being retrieved
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested candidate record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 candidateName:
 *                   type: string
 *                 emailAddress:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *       404:
 *         description: Candidate record not found
 *       500:
 *         description: Server error
 */
router.get("/mycandidate/:candidateName", candidateController.getAllCandidates);

module.exports = router;
