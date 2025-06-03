const express = require("express");
const moduleController = require("../controllers/moduleController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Module
 *     description: Module management
 */

/**
 * @swagger
 * /api/module:
 *   post:
 *     tags: [Module]
 *     summary: Create a new module record
 *     description: Creates a new module record for an employee.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               Active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Module record created successfully
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
router.post("/", moduleController.createModule);

/**
 * @swagger
 * /api/module:
 *   get:
 *     tags: [Module]
 *     summary: Get all module records
 *     description: Retrieves a list of all module records.
 *     responses:
 *       200:
 *         description: A list of all module records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   Name:
 *                     type: string
 *                   Active:
 *                     type: boolean
 *       500:
 *         description: Server error
 */
router.get("/", moduleController.getAllModules);

/**
 * @swagger
 * /api/module/{id}:
 *   get:
 *     tags: [Module]
 *     summary: Get a module record by ID
 *     description: Retrieve a specific module record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the module record
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested module record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 Name:
 *                   type: string
 *                 Ative:
 *                   type: boolean
 *       404:
 *         description: Module record not found
 *       500:
 *         description: Server error
 */
router.get("/:id", moduleController.getModuleById);

/**
 * @swagger
 * /api/module/{id}:
 *   put:
 *     tags: [Module]
 *     summary: Update a module record
 *     description: Modify an existing module record by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the module record to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               Ative:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Module record updated
 *       404:
 *         description: Module record not found
 *       500:
 *         description: Server error
 */
router.put("/:id", moduleController.updateModule);

/**
 * @swagger
 * /api/module/{id}:
 *   delete:
 *     tags: [Module]
 *     summary: Delete a module record
 *     description: Delete a specific module record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the module record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Module record deleted successfully
 *       404:
 *         description: Module record not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", moduleController.deleteModule);

module.exports = router;
