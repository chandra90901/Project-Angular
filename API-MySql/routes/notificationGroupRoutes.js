const express = require("express");
const notificationGroupController = require("../controllers/notificationGroupController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: NotificationGroup
 *     description: NotificationGroup management
 */

/**
 * @swagger
 * /api/notificationGroup:
 *   post:
 *     tags: [NotificationGroup]
 *     summary: Create a new notificationGroup record
 *     description: Creates a new notificationGroup record for an employee.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               GroupName:
 *                 type: string
 *               Status:
 *                 type: string
 *     responses:
 *       201:
 *         description: NotificationGroup record created successfully
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
router.post("/", notificationGroupController.createNotificationGroup);
/**
 * @swagger
 * /api/notificationGroup:
 *   get:
 *     tags: [NotificationGroup]
 *     summary: Get all notificationGroup records
 *     description: Retrieves a list of all notificationGroup records.
 *     responses:
 *       200:
 *         description: A list of all notificationGroup records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   GroupName:
 *                     type: string
 *                   Status:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/", notificationGroupController.getAllNotificationGroup);

/**
 * @swagger
 * /api/notificationGroup/{id}:
 *   get:
 *     tags: [NotificationGroup]
 *     summary: Get a notificationGroup record by ID
 *     description: Retrieve a specific notificationGroup record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the notificationGroup record
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested notificationGroup record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 GroupName:
 *                   type: string
 *                 Status:
 *                   type: string
 *       404:
 *         description: NotificationGroup record not found
 *       500:
 *         description: Server error
 */
router.get("/:id", notificationGroupController.getNotificationGroupById);
/**
 * @swagger
 * /api/notificationGroup/{id}:
 *   put:
 *     tags: [NotificationGroup]
 *     summary: Update a notificationGroup record
 *     description: Modify an existing notificationGroup record by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the notificationGroup record to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               GroupName:
 *                 type: string
 *               Status:
 *                 type: string
 *     responses:
 *       200:
 *         description: NotificationGroup record updated
 *       404:
 *         description: NotificationGroup record not found
 *       500:
 *         description: Server error
 */

router.put("/:id", notificationGroupController.updateNotificationGroup);
/**
 * @swagger
 * /api/notificationGroup/{id}:
 *   delete:
 *     tags: [NotificationGroup]
 *     summary: Delete a notificationGroup record
 *     description: Delete a specific notificationGroup record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the notificationGroup record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: NotificationGroup record deleted successfully
 *       404:
 *         description: NotificationGroup record not found
 *       500:
 *         description: Server error
 */

router.delete("/:id", notificationGroupController.deleteNotificationGroup);
// router.get("/mynotificationGroup/:groupName", notificationGroupController.getMyNotificationGroup);

module.exports = router;
