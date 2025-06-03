// const express = require("express");
// const notificationController = require("../controllers/notificationController");
// const router = express.Router();

// router.post("/", notificationController.createNotification);
// router.get("/", notificationController.getAllNotification);
// router.get("/:id", notificationController.getNotificationById);
// router.put("/:id", notificationController.updateNotification);
// router.delete("/:id", notificationController.deleteNotification);
// // router.get("/mynotification/:groupName", notificationController.getMyNotification);

// module.exports = router;


const express = require("express");
const notificationController = require("../controllers/notificationController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Notification
 *     description: Notification management
 */

/**
 * @swagger
 * /api/Notification:
 *   post:
 *     tags: [Notification]
 *     summary: Create a new notification record
 *     description: Creates a new notification record for an employee.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeId:
 *                 type: integer
 *               groupId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Notification record created successfully
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
router.post("/", notificationController.createNotification);
/**
 * @swagger
 * /api/notification:
 *   get:
 *     tags: [Notification]
 *     summary: Get all notification records
 *     description: Retrieves a list of all notification records.
 *     responses:
 *       200:
 *         description: A list of all notification records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   employeeId:
 *                     type: integer
 *                   groupId:
 *                     type: integer
 *       500:
 *         description: Server error
 */
router.get("/", notificationController.getAllNotification);

/**
 * @swagger
 * /api/notification/{id}:
 *   get:
 *     tags: [Notification]
 *     summary: Get a notification record by ID
 *     description: Retrieve a specific notification record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the notification record
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested notification record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 employeeId:
 *                   type: integer
 *                 groupId:
 *                   type: integer
 *       404:
 *         description: Notification record not found
 *       500:
 *         description: Server error
 */
router.get("/:id", notificationController.getNotificationById);
/**
 * @swagger
 * /api/notification/{id}:
 *   put:
 *     tags: [Notification]
 *     summary: Update a notification record
 *     description: Modify an existing notification record by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the notification record to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeId:
 *                 type: integer
 *               groupId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Notification record updated
 *       404:
 *         description: Notification record not found
 *       500:
 *         description: Server error
 */

router.put("/:id", notificationController.updateNotification);
/**
 * @swagger
 * /api/notification/{id}:
 *   delete:
 *     tags: [Notification]
 *     summary: Delete a notification record
 *     description: Delete a specific notification record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the notification record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notification record deleted successfully
 *       404:
 *         description: Notification record not found
 *       500:
 *         description: Server error
 */

router.delete("/:id", notificationController.deleteNotification);
// router.get("/mynotificationGroup/:groupName", notificationGroupController.getMyNotificationGroup);

module.exports = router;

