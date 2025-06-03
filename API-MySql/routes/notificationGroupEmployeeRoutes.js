const express = require("express");
const notificationGroupEmployeeController = require("../controllers/notificationGroupEmployeeController");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: NotificationGroupEmployee
 *     description: NotificationGroupEmployee management
 */

/**
 * @swagger
 * /api/notificationGroupEmployee:
 *   post:
 *     tags: [NotificationGroupEmployee]
 *     summary: Create a new notificationGroupEmployee record
 *     description: Creates a new notificationGroupEmployee record for an employee.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EmployeeId:
 *                 type: integer
 *               Status:
 *                 type: string
 *               GroupId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: NotificationGroupEmployee record created successfully
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
router.post('/', notificationGroupEmployeeController.createNotificationGroupEmployee);
/**
 * @swagger
 * /api/notificationGroupEmployee:
 *   get:
 *     tags: [NotificationGroupEmployee]
 *     summary: Get all notificationGroupEmployee records
 *     description: Retrieves a list of all notificationGroupEmployee records.
 *     responses:
 *       200:
 *         description: A list of all notificationGroupEmployee records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   EmployeeId:
 *                     type: integer
 *                   Status:
 *                     type: string
 *                   GroupId:
 *                     type: integer
 *       500:
 *         description: Server error
 */
router.get('/', notificationGroupEmployeeController.getAllNotificationGroupEmployees);
/**
 * @swagger
 * /api/notificationGroupEmployee/{id}:
 *   get:
 *     tags: [NotificationGroupEmployee]
 *     summary: Get a notificationGroupEmployee record by ID
 *     description: Retrieve a specific notificationGroupEmployee record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the notificationGroupEmployee record
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested notificationGroupEmployee record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 EmployeeId:
 *                   type: integer
 *                 Status:
 *                   type: string
 *                 GroupId:
 *                   type: integer
 *       404:
 *         description: NotificationGroupEmployee record not found
 *       500:
 *         description: Server error
 */
router.get('/:id', notificationGroupEmployeeController.getNotificationGroupEmployeeById);
/**
 * @swagger
 * /api/notificationGroupEmployee/{id}:
 *   put:
 *     tags: [NotificationGroupEmployee]
 *     summary: Update a notificationGroupEmployee record
 *     description: Modify an existing notificationGroupEmployee record by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the notificationGroupEmployee record to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EmployeeId:
 *                 type: integer
 *               Status:
 *                 type: string
 *               GroupId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: NotificationGroupEmployee record updated
 *       404:
 *         description: NotificationGroupEmployee record not found
 *       500:
 *         description: Server error
 */
router.put('/:id', notificationGroupEmployeeController.updateNotificationGroupEmployee);
/**
 * @swagger
 * /api/notificationGroupEmployee/{id}:
 *   delete:
 *     tags: [NotificationGroupEmployee]
 *     summary: Delete a notificationGroupEmployee record
 *     description: Delete a specific notificationGroupEmployee record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the notificationGroupEmployee record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: NotificationGroupEmployee record deleted successfully
 *       404:
 *         description: NotificationGroupEmployee record not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', notificationGroupEmployeeController.deleteNotificationGroupEmployee);
module.exports = router;
