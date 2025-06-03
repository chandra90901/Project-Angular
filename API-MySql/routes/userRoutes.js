const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User management
 */

/**
 * @swagger
 * /api/user:
 *   post:
 *     tags: [User]
 *     summary: Create a new user record
 *     description: Creates a new user record for an employee.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Username:
 *                 type: integer
 *               Password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User record created successfully
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
router.post("/", userController.createUser);


/**
 * @swagger
 * /api/user:
 *   get:
 *     tags: [User]
 *     summary: Get all user records
 *     description: Retrieves a list of all user records.
 *     responses:
 *       200:
 *         description: A list of all user records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *               Username:
 *                 type: integer
 *               Password:
 *                 type: string
 *       500:
 *         description: Server error
 */
router.get("/", userController.getAllUser);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     tags: [User]
 *     summary: Get an user record by ID
 *     description: Retrieve a specific user record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user record
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested user record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *               Username:
 *                 type: integer
 *               Password:
 *                 type: string
 *       404:
 *         description: User record not found
 *       500:
 *         description: Server error
 */
router.get("/:id", userController.getUserById);

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     tags: [User]
 *     summary: Update an user record
 *     description: Modify an existing user record by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user record to update
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
 *                 enum: [new, approved, rejected]
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: User record updated
 *       404:
 *         description: User record not found
 *       500:
 *         description: Server error
 */
router.put("/:id", userController.updateUser);

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     tags: [User]
 *     summary: Delete an user record
 *     description: Delete a specific user record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User record deleted successfully
 *       404:
 *         description: User record not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", userController.deleteUser);

router.post("/checkUser", userController.checkUser);

module.exports = router;
