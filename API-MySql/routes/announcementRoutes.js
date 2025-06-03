// const express = require("express");
// const announcementController = require("../controllers/announcementController");
// const router = express.Router();

// router.post("/", announcementController.createAnnouncement);
// router.get("/", announcementController.getAllAnnouncements);
// router.get("/:id", announcementController.getAnnouncementById);
// router.put("/:id", announcementController.updateAnnouncement);
// router.delete("/:id", announcementController.deleteAnnouncement);

// module.exports = router;


const express = require("express");
const announcementController = require("../controllers/announcementController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Announcement
 *     description: Announcement management
 */

/**
 * @swagger
 * /api/announcement:
 *   post:
 *     tags: [Announcement]
 *     summary: Create a new announcement record
 *     description: Creates a new announcement record for an employee.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeId:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Announcement record created successfully
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
router.post("/", announcementController.createAnnouncement);

/**
 * @swagger
 * /api/announcement:
 *   get:
 *     tags: [Announcement]
 *     summary: Get all announcement records
 *     description: Retrieves a list of all announcement records.
 *     responses:
 *       200:
 *         description: A list of all announcement records
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
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/", announcementController.getAllAnnouncements);

/**
 * @swagger
 * /api/announcement/{id}:
 *   put:
 *     tags: [Announcement]
 *     summary: Update an announcement record
 *     description: Modify an existing announcement record by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the announcement record to update
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
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Announcement record updated
 *       404:
 *         description: Announcement record not found
 *       500:
 *         description: Server error
 */
router.put("/:id", announcementController.updateAnnouncement);

/**
 * @swagger
 * /api/announcement/{id}:
 *   delete:
 *     tags: [Announcement]
 *     summary: Delete an announcement record
 *     description: Delete a specific announcement record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the announcement record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Announcement record deleted successfully
 *       404:
 *         description: Announcement record not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", announcementController.deleteAnnouncement);

/**
 * @swagger
 * /api/announcement/{id}:
 *   get:
 *     tags: [Announcement]
 *     summary: Get an announcement record by ID
 *     description: Retrieve a specific announcement record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the announcement record
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested announcement record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 employeeId:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *       404:
 *         description: Announcement record not found
 *       500:
 *         description: Server error
 */
router.get("/:id", announcementController.getAnnouncementById);
module.exports = router;
