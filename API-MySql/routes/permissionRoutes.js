const express = require("express");
const permissionController = require("../controllers/permissionController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Permission
 *     description: Permission management
 */

/**
 * @swagger
 * /api/permission:
 *   post:
 *     tags: [Permission]
 *     summary: Create a new permission record
 *     description: Creates a new permission record for an employee.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ModuleId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Permission record created successfully
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
router.post("/", permissionController.createPermission);

/**
 * @swagger
 * /api/permission:
 *   get:
 *     tags: [Permission]
 *     summary: Get all permission records
 *     description: Retrieves a list of all permission records.
 *     responses:
 *       200:
 *         description: A list of all permission records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   ModuleId:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/", permissionController.getAllPermissions);

/**
 * @swagger
 * /api/permission/{id}:
 *   get:
 *     tags: [Permission]
 *     summary: Get a permission record by ID
 *     description: Retrieve a specific permission record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the permission record
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested permission record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 ModuleId:
 *                   type: string
 *       404:
 *         description: Permission record not found
 *       500:
 *         description: Server error
 */
router.get("/:id", permissionController.getPermissionById);

/**
 * @swagger
 * /api/permission/{id}:
 *   put:
 *     tags: [Permission]
 *     summary: Update a permission record
 *     description: Modify an existing permission record by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the permission record to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ModuleId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Permission record updated
 *       404:
 *         description: Permission record not found
 *       500:
 *         description: Server error
 */
router.put("/:id", permissionController.updatePermission);

/**
 * @swagger
 * /api/permission/{id}:
 *   delete:
 *     tags: [Permission]
 *     summary: Delete a permission record
 *     description: Delete a specific permission record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the permission record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Permission record deleted successfully
 *       404:
 *         description: Permission record not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", permissionController.deletePermission);

module.exports = router;
