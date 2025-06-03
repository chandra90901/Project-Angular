const express = require("express");
const roleController = require("../controllers/roleController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Role
 *     description: Role management
 */

/**
 * @swagger
 * /api/role:
 *   post:
 *     tags: [Role]
 *     summary: Create a new role record
 *     description: Creates a new role record for an employee.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleName:
 *                 type: string
 *               roleStatus:
 *                 type: string
 *     responses:
 *       201:
 *         description: Role record created successfully
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
router.post("/", roleController.createRole);

/**
 * @swagger
 * /api/role:
 *   get:
 *     tags: [Role]
 *     summary: Get all role records
 *     description: Retrieves a list of all role records.
 *     responses:
 *       200:
 *         description: A list of all role records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   roleName:
 *                     type: string
 *                   roleStatus:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/", roleController.getAllRoles);

/**
 * @swagger
 * /api/role/{id}:
 *   get:
 *     tags: [Role]
 *     summary: Get a role record by ID
 *     description: Retrieve a specific role record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the role record
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested role record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 roleName:
 *                   type: string
 *                 roleStatus:
 *                   type: string
 *       404:
 *         description: Role record not found
 *       500:
 *         description: Server error
 */
router.get("/:id", roleController.getRoleById);

/**
 * @swagger
 * /api/role/{id}:
 *   put:
 *     tags: [Role]
 *     summary: Update a role record
 *     description: Modify an existing role record by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the role record to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleName:
 *                 type: string
 *               roleStatus:
 *                 type: string
 *     responses:
 *       200:
 *         description: Role record updated
 *       404:
 *         description: Role record not found
 *       500:
 *         description: Server error
 */
router.put("/:id", roleController.updateRole);

/**
 * @swagger
 * /api/role/{id}:
 *   delete:
 *     tags: [Role]
 *     summary: Delete a role record
 *     description: Delete a specific role record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the role record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Role record deleted successfully
 *       404:
 *         description: Role record not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", roleController.deleteRole);

module.exports = router;
