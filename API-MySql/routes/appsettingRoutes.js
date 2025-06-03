// const express = require("express");
// const appSettingController = require("../controllers/appSettingController");
// const router = express.Router();

// router.post("/", appSettingController.createSetting);
// router.get("/", appSettingController.getAllSettings);
// router.get("/:id", appSettingController.getSettingById);
// router.put("/:id", appSettingController.updateSetting);
// router.delete("/:id", appSettingController.deleteSetting);

// module.exports = router;


const express = require("express");
const appSettingController = require("../controllers/appSettingController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: AppSetting
 *     description: AppSetting management
 */

/**
 * @swagger
 * /api/appSetting:
 *   post:
 *     tags: [AppSetting]
 *     summary: Create a new appSetting record
 *     description: Creates a new appSetting record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               property:
 *                 type: string
 *               value:
 *                 type: string
 *     responses:
 *       201:
 *         description: AppSetting record created successfully
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
router.post("/", appSettingController.createSetting);

/**
 * @swagger
 * /api/appSetting:
 *   get:
 *     tags: [AppSetting]
 *     summary: Get all appSetting records
 *     description: Retrieves a list of all appSetting records.
 *     responses:
 *       200:
 *         description: A list of all appSetting records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   property:
 *                     type: string
 *                   value:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/", appSettingController.getAllSettings);

/**
 * @swagger
 * /api/appSetting/{id}:
 *   put:
 *     tags: [AppSetting]
 *     summary: Update an appSetting record
 *     description: Modify an existing appSetting record by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the appSetting record to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               property:
 *                 type: string
 *               value:
 *                 type: string
 *     responses:
 *       200:
 *         description: AppSetting record updated
 *       404:
 *         description: AppSetting record not found
 *       500:
 *         description: Server error
 */
router.put("/:id", appSettingController.updateSetting);

/**
 * @swagger
 * /api/appSetting/{id}:
 *   delete:
 *     tags: [AppSetting]
 *     summary: Delete an appSetting record
 *     description: Delete a specific appSetting record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the appSetting record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: AppSetting record deleted successfully
 *       404:
 *         description: AppSetting record not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", appSettingController.deleteSetting);

/**
 * @swagger
 * /api/appSetting/{id}:
 *   get:
 *     tags: [AppSetting]
 *     summary: Get an appSetting record by ID
 *     description: Retrieve a specific appSetting record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the appSetting record
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested appSetting record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 property:
 *                   type: string
 *                 value:
 *                   type: string
 *       404:
 *         description: AppSetting record not found
 *       500:
 *         description: Server error
 */
router.get("/:id", appSettingController.getSettingById);
module.exports = router;